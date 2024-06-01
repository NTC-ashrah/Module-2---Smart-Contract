import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm && amount > 0) {
      let tx = await atm.deposit(amount);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm && amount > 0) {
      let tx = await atm.withdraw(amount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <div className="flex justify-center text-sm font-thin mt-6">
          <button
            className="hover:bg-yellow-400 bg-yellow-600 p-4 rounded text-white"
            onClick={connectAccount}
          >
            Please connect your Metamask wallet
          </button>
        </div>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
        <div className="text-sm font-thin">
          <hr className="mb-4" />
          <p className="text-gray-800 font-bold text-md mb-4">
            <span className="text-lg">Your Account:</span> 
            <span className="block break-words">{account}</span>
          </p>
          <hr className="mb-4" />
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-200 p-4 rounded-md shadow-inner">
              <p className="text-yellow-500 font-bold text-2xl">
                Your Balance: {balance}
              </p>
            </div>
          </div>
          <hr className="mb-4" />
        </div>
        <div className="flex justify-center mt-5">
          <div className="relative w-64">
            <input
              className="p-3 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="Input Amount"
              value={amount}
              onChange={(e) => {
                const x = e.target.value;
                setAmount(x >= 0 ? x : 0);
              }}
            />
            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center hidden group-hover:flex">
              <button
                className="px-2 text-gray-600 hover:text-gray-800"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                ▲
              </button>
              <button
                className="px-2 text-gray-600 hover:text-gray-800"
                onClick={() => setAmount((prev) => (prev < 1 ? 0 : prev - 1))}
              >
                ▼
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-10 text-white">
          <button
            className="border bg-blue-700/60 p-1 px-4 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-500"
            disabled={amount <= 0}
            onClick={deposit}
          >
            Deposit
          </button>
          <button
            className="border bg-blue-700/60 p-1 px-4 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-500"
            disabled={amount <= 0}
            onClick={withdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="bg-gray-500 rounded shadow-xxl p-4 py-10">
        <header className="flex justify-center mt-5">
          <h1 className="font-bold text-white text-4xl">
            Welcome to the Metacrafters ATM!
          </h1>
        </header>

        {initUser()}
      </div>
    </main>
  );
}
