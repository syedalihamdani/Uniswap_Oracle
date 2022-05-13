// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Orecle = await hre.ethers.getContractFactory("Oracle");
  // const oracle = await Orecle.deploy("0x9117aB998665086df16367aF10094fF47f9894c0");

  // await oracle.deployed();

  // console.log("oracle deployed to:", oracle.address);

  const UniswapV3Factory="0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const WETH9="0xc778417E063141139Fce010982780140Aa0cD5Ab";
  const DAI="0xaD6D458402F60fD3Bd25163575031ACDce07538D";
  const FEE=3000;

  const UniswapV3Oracle = await hre.ethers.getContractFactory("UniswapV3Oracle");
  const uniswapV3oracle = await UniswapV3Oracle.deploy(UniswapV3Factory,WETH9,DAI,FEE);

  await uniswapV3oracle.deployed();

  console.log("uniswapV3oracle deployed to:", uniswapV3oracle.address);


 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
