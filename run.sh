#!/bin/bash

echo "Starting Ganache"
truffle compile
echo "Deploying contracts"
output=$(truffle migrate --reset)
echo "Output: $output"

contract_address=$(echo "$output" | awk '/contract address/{print $4}')

echo "Contract Address: $contract_address"

cd server
echo "Writing contract address to .env file"

echo "RPC_SERVER=http://127.0.0.1:8545" > .env
echo "CONTRACT_ADDRESS=$contract_address" >> .env
echo "PRIVATE_KEY=0xe11f60dc7e32291b1e9123828a47b454d7affb01e3135888e3bf1dcc77e1d5af" >> .env
echo "Starting server"
npm start
