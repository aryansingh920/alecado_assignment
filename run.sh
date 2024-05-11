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

echo "RPC_SERVER=http://localhost:7545" > .env
echo "CONTRACT_ADDRESS=$contract_address" >> .env
echo "Starting server"
npm start
