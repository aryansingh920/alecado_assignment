// server/src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import Web3 from "web3";
import { abi } from "../../build/contracts/SimpleStorage.json";
import cors from "cors";
import helmet from "helmet";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const app = express();
const port = 3005;

const web3 = new Web3(process.env.RPC_SERVER!); // Connect to Ganache

const contractAddress: string = process.env.CONTRACT_ADDRESS!; // Update with your deployed contract address
const simpleStorageContract = new web3.eth.Contract(
  abi as any,
  contractAddress
);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: multer.memoryStorage() }).single('file')); // Use memory storage





// Endpoint to upload a file and sign it
app.post("/uploadFile", async (req: MulterRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file attached to the request.' });
    }

    console.log(req.file)

const file: Express.Multer.File = req.file;
let fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
fileHash = web3.utils.asciiToHex(fileHash).substring(0, 66);
let signature = web3.eth.accounts.sign(fileHash, process.env.PRIVATE_KEY!).signature;
signature = web3.utils.asciiToHex(signature).substring(0, 66);


    const accounts = await web3.eth.getAccounts();
    const gas = await simpleStorageContract.methods.setFile(file.originalname, fileHash, signature).estimateGas();

    const result = await simpleStorageContract.methods
      .setFile(file.originalname, fileHash, signature)
      .send({ from: accounts[0], gas });

    res.json({ success: true, transactionHash: result.transactionHash });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});







// Endpoint to get the file's information and signature
app.get("/getFile/:fileName", async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const result = await simpleStorageContract.methods.getFile(fileName).call();

    if (!result || typeof result !== 'object') {
      throw new Error('Unexpected result from getFile');
    }

    const fileHash = result[0];
    const signature = result[1];

    if (!fileHash || !signature) {
      throw new Error('Missing fileHash or signature in the result');
    }

    res.json({ success: true, fileHash, signature });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to sign a file
app.post("/signFile", async (req: MulterRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file attached to the request.' });
    }

    const file: Express.Multer.File = req.file;
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    const signature = web3.eth.accounts.sign(fileHash, process.env.PRIVATE_KEY!).signature;

    res.json({ success: true, fileHash: web3.utils.asciiToHex(fileHash), signature: web3.utils.asciiToHex(signature) });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to check where a file is signed
app.get("/checkSignature/:fileHash", async (req, res) => {
  try {
    const fileHash = req.params.fileHash;
    const signature = await simpleStorageContract.methods.getFile(fileHash).call();

    res.json({ success: true, signature });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
