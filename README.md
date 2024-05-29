# Module-2---Smart-Contract
Smart contract with front end
Metacrafters ATM DApp
Welcome to the Metacrafters ATM! This decentralized application (DApp) allows users to interact with an Ethereum smart contract to deposit and withdraw Ether (ETH). The application leverages MetaMask for wallet integration and the ethers.js library for blockchain interactions.

Table of Contents
Introduction
Features
Prerequisites
Installation
Usage
Code Overview
License
Introduction
The Metacrafters ATM DApp is designed to provide a simple interface for users to deposit and withdraw ETH from their accounts. It connects to an Ethereum smart contract deployed at a specific address and uses MetaMask for user authentication and transaction signing.

Features
Connect to MetaMask wallet
Display connected account address and balance
Deposit ETH to the smart contract
Withdraw ETH from the smart contract
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14 or higher)
MetaMask browser extension
An Ethereum test network (e.g., Rinkeby, Goerli)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/metacrafters-atm.git
cd metacrafters-atm
Install dependencies:

bash
Copy code
npm install
Ensure you have the smart contract ABI available in the specified path: ../artifacts/contracts/Assessment.sol/Assessment.json.

Usage
Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

Connect your MetaMask wallet when prompted.

Use the interface to deposit and withdraw ETH.

Code Overview
State Variables
ethWallet: Stores the MetaMask wallet instance.
account: Stores the connected account address.
atm: Stores the instance of the smart contract.
balance: Stores the current balance of the user in the smart contract.
amount: Stores the amount to be deposited or withdrawn.
Functions
getWallet: Checks for the presence of MetaMask and sets the wallet instance.
handleAccount: Handles the connected account and sets the account state.
connectAccount: Connects to the MetaMask wallet and retrieves accounts.
getATMContract: Creates a contract instance using ethers.js.
getBalance: Fetches the user's balance from the smart contract.
deposit: Deposits the specified amount of ETH into the smart contract.
withdraw: Withdraws the specified amount of ETH from the smart contract.
initUser: Initializes the user interface based on the wallet and account state.
Components
HomePage: The main component that renders the UI and manages the state and interactions.
Usage of useEffect
The useEffect hook is used to initialize the wallet when the component mounts.

Smart Contract Interaction
The contract address and ABI are used to create a contract instance with ethers.js, allowing for interaction with the deployed smart contract.

License
This project is licensed under the MIT License. See the LICENSE file for details.
