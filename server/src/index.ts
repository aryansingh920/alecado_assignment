// server/src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Web3 from "web3";
import { abi } from "../../build/contracts/SimpleStorage.json";

const app = express();
const port = 3005;

const web3 = new Web3(process.env.RPC_SERVER!); // Connect to Ganache

const contractAddress: string = process.env.CONTRACT_ADDRESS!; // Update with your deployed contract address
const simpleStorageContract = new web3.eth.Contract(
  abi as any,
  contractAddress
);

app.use(express.json());

// Endpoint to set text in the contract
app.post("/setText", async (req, res) => {
  try {
    const { text } = req.body;

    // Assuming your Solidity contract has a `set` function
    const accounts = await web3.eth.getAccounts();
    const gas = await simpleStorageContract.methods.set(text).estimateGas();

    const result = await simpleStorageContract.methods
      .set(text)
      .send({ from: accounts[0], gas });

    res.json({ success: true, transactionHash: result.transactionHash });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to get the current stored text from the contract
app.get("/getText", async (req, res) => {
  try {
    // Assuming your Solidity contract has a getter function (e.g., getText())
    const storedText = await simpleStorageContract.methods.getText().call();

    res.json({ success: true, storedText });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
