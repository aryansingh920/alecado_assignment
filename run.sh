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
echo "PRIVATE_KEY=0x2a4e33bfa217b73d69d526eaa9268c831eda429223fe8deda4cf9c106788d73f" >> .env
echo "Starting server"
npm start
