//Good practice is to wrap everything in a main function

// If functions return promises use async await!!
// the await word waits to see if the promise get's fullfilled
//or rejected

//Use main as an async function to wait for contracts to be
//deployed

//Solc JS can compile contracts that imports contracts via
//relative paths
//corepack enable lets us use yarn for installing solc
//yarn add solc
//yarn add solc@0.8.7-fixed version of solidity
//yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
//Script above can be added to the package.json to choose what we say in the terminal instead

//yarn add ethers
const ethers = require("ethers");
//fs for reading binary and abi files
//yarn add fs-extra
const fs = require("fs-extra");
const crypto = require("crypto");

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider("ADD URL FOR PROVIDER");
  const wallet = new ethers.Wallet("ADD PRIVATE KEY", provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  // ContractFactory from ethers is an object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying please wait...");
  //Resolves promise with await
  //Within deploy gas price and limit can be set with {}
  const contract = await contractFactory.deploy();
  //Wait one block to make sure it get's attached to the chain
  //const transactionReceipt = await contract.deploymentTransaction().wait(1);

  //   console.log(transactionReceipt);
  //   const transactionResponse = contract.deploymentTransaction();
  //   console.log(transactionResponse);
  //   const nonce = await wallet.getNonce();
  //   const tx = {
  //   Transaction we haven't used at wallet address before
  //     nonce: nonce,
  //     gasPrice: 20000000000,
  //     gasLimit: 1000000,
  //     to: null,
  //     value: 0,
  //     ABI
  //     data: "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b578063654cf88c14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220b0fbb0cb53a42190c6fa898a376f9fa8a0c10733b370e255d2724335293e02a364736f6c63430008070033",
  //     chainId: 1337,
  //   };
  //   const signedTxResponse = await wallet.sendTransaction(tx);
  //   console.log(signedTxResponse);
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   await sentTxResponse.wait(1);
  //   console.log(sentTxResponse);

  //   returns uint256 from solidity through the ABI
  //   View Function costs no gas

  const currentHashNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentHashNumber.toString()}`);
  const transactionResponse = await contract.store(hash);
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedHashNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${updatedHashNumber.toString()}`);
}

function calculate_sha256(file_path) {
  const hashstrt = "0x";
  const fileData = require("fs").readFileSync(file_path);
  const hash = crypto.createHash("sha256").update(fileData).digest("hex");
  const result = hashstrt.concat(hash);
  return result;
}

const hash = calculate_sha256("./document.docx");
//Calls main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
