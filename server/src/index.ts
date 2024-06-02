// server/src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import Web3 from "web3";
import { abi } from "../../build/contracts/NFTContract.json"; // Updated ABI file
import cors from "cors";
import helmet from "helmet";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const app = express();
const port = 3005;

const web3 = new Web3(process.env.RPC_SERVER!); // Connect to Ganache

const contractAddress: string = process.env.CONTRACT_ADDRESS!; // Update with your deployed contract address
const nftContract = new web3.eth.Contract(
  abi as any,
  contractAddress
);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: multer.memoryStorage() }).single('file')); // Use memory storage

// Endpoint to upload a file and mint NFT
app.post("/uploadAndMint", async (req: MulterRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file attached to the request.' });
    }

    const file: Express.Multer.File = req.file;
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // Assume you have a function to get the user's address
    const userAddress = getUserAddress();

    // Mint the NFT
    const tokenId = await mintNFT(userAddress, fileHash);

    res.json({ success: true, tokenId });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function mintNFT(userAddress: string, fileHash: string): Promise<number> {
  // Assume you have the user's address and file hash
  // Call the mintNFT function of the contract and pass user's address and file hash
  const accounts = await web3.eth.getAccounts();
  const result = await nftContract.methods.mintNFT(userAddress, fileHash).send({ from: accounts[0] });

  // Assuming you get back the tokenId from the mintNFT function
  const tokenId = parseInt(result.events.Transfer.returnValues.tokenId);

  return tokenId;
}

function getUserAddress(): string {
  // Assume you have a function to retrieve the user's address from the authentication process
  return "0x123abc...";
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
