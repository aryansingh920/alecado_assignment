# SimpleStorage Blockchain Project

## Overview

The SimpleStorage Blockchain Project is a decentralized application (DApp) showcasing the usage of the Ethereum blockchain. This project enables users to store and retrieve text data on the blockchain through a smart contract implemented in Solidity.

## Project Structure

### Contracts

- **contracts/SimpleStorage.sol**: Solidity smart contract for storing text data on the Ethereum blockchain.

### Migrations

- **migrations/1_initial_migration.js**: Truffle migration script for deploying the Migrations contract.
- **migrations/2_deploy_contracts.js**: Truffle migration script for deploying the SimpleStorage contract.

### Tests

- **test/**: Contains test scripts for the smart contract.

### Build

- **build/**: Generated artifacts and compiled contracts.

### Server

- **server/src/index.ts**: Express.js server for interacting with the blockchain.

### Configuration

- **.env**: Environment variables file for configuration.

### Version Control

- **.gitignore**: Specifies intentionally untracked files to ignore.

### Node.js Configuration

- **package.json**: Node.js project configuration file.

### Truffle Configuration

- **truffle-config.js**: Truffle configuration file.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/simple-storage-blockchain.git`
2. Run the script file `bash run.sh`

## Usage

- Access the server at `http://localhost:3000`.
- Use the provided HTTP requests in the `api` folder to interact 



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
