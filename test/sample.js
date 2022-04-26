// const { expect } = require("chai");
// const { ethers,waffle } = require("hardhat");
// const provider=waffle.provider;

// describe("multiSigWallet", function () {
//   beforeEach("Deploying contract for unit testing",async function(){
//     [this.account1,this.account2,this.account3,this.account4,this.account5,this.account6,this.account7,this.account8,this.account9,
//       this.account10,this.account11,this.account12,this.account13,this.account14,this.account15,this.account16,this.account17,this.account18,
//       this.account19,this.account20]=await ethers.getSigners();
//       const multiSigWallet=await ethers.getContractFactory("multisigwallet");
//       this.deployedMultiSigWallet=await multiSigWallet.deploy([this.account1.address,this.account2.address,this.account3.address,
//       this.account4.address,this.account5.address],3);
//       await this.deployedMultiSigWallet.deployed();

//       this.fromAccount1=this.deployedMultiSigWallet.connect(this.account1);
//       this.fromAccount2=this.deployedMultiSigWallet.connect(this.account2);
//       this.fromAccount3=this.deployedMultiSigWallet.connect(this.account3);
//       this.fromAccount4=this.deployedMultiSigWallet.connect(this.account4);
//       this.fromAccount5=this.deployedMultiSigWallet.connect(this.account5);

//       this.fromAccount16=this.deployedMultiSigWallet.connect(this.account16);
//       this.fromAccount17=this.deployedMultiSigWallet.connect(this.account17);
//       this.fromAccount18=this.deployedMultiSigWallet.connect(this.account18);
//       this.fromAccount19=this.deployedMultiSigWallet.connect(this.account19);
//       this.fromAccount20=this.deployedMultiSigWallet.connect(this.account20);

//   })
//   it("multiSigWallet:Owners addresses", async function () {
//     const Owners=await this.deployedMultiSigWallet.contractOwners();
//     expect(Owners.toString()).to.equal([this.account1.address,this.account2.address,this.account3.address,
//       this.account4.address,this.account5.address].toString())
//   });
//   it("multiSigWallet:Check Owner", async function () {
//     const result=await this.deployedMultiSigWallet.checkOwner(this.account6.address);
//     expect(result).to.equal(false);
//   });
//   it("multiSigWallet:Required confirmations", async function () {
//     const requiredConfirmations=await this.deployedMultiSigWallet.requiredConfirmations();
//     expect(requiredConfirmations).to.equal(3);
//   });
//   it("multiSigWallet:receive ether & check Balance", async function () {
//     const tx=await this.account6.sendTransaction({
//       to:this.deployedMultiSigWallet.address,
//       value:ethers.utils.parseUnits("22",18)
//     })
//     let value=ethers.utils.parseUnits("22",18);
//     const balance=await this.deployedMultiSigWallet.Balance();
//     expect(balance.toString()).to.equal(value.toString());
//   });
//   it("multiSigWallet:addTransaction function test", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.deployedMultiSigWallet.addTransaction(this.account20.address,value);
//     const transactionData=await this.deployedMultiSigWallet.transactionData(1);
//     console.log(transactionData)
//   });

//   it("multiSigWallet:addTransaction function test", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     const transactionData=await this.fromAccount1.transactionData(1);
//     console.log(transactionData)
//   });
//   it("multiSigWallet:addTransaction function test should revert with multiSigWallet:Only wallet owner is allowed", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     await expect(this.fromAccount16.addTransaction(this.account20.address,value)).to.be.revertedWith("multiSigWallet:Only wallet owner is allowed");
     
//   });
//   it("multiSigWallet:confirmTransaction function test", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.confirmTransaction(1);
//     await this.fromAccount3.confirmTransaction(1);
//     // await this.fromAccount4.confirmTransaction(1);
//     const transactionData=await this.fromAccount1.transactionData(1);
//     console.log(transactionData)
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with multiSigWallet:Only wallet owner is allowed", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await expect(this.fromAccount16.confirmTransaction(1)).to.be.revertedWith("multiSigWallet:Only wallet owner is allowed");   
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with,multiSignatureWallet:Transaction does not exist", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await expect(this.fromAccount2.confirmTransaction(2)).to.be.revertedWith("multiSignatureWallet:Transaction does not exist");   
//   });
//   it("multiSigWallet:revokeTransaction function test should revert with,multiSigWallet:You have already reject the transaction", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.revokeTransaction(1);
//     await this.fromAccount3.confirmTransaction(1);
//     await expect(this.fromAccount2.confirmTransaction(1)).to.be.revertedWith("multiSigWallet:You have already reject the transaction");   
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with,multiSigWallet:Transaction is already confirmed and ready to execute", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.confirmTransaction(1);
//     await this.fromAccount3.confirmTransaction(1);
//     await expect(this.fromAccount4.confirmTransaction(1)).to.be.revertedWith("multiSigWallet:Transaction is already confirmed and ready to execute");   
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with,multiSigWallet:Transaction has been cancled by others", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.revokeTransaction(1);
//     await this.fromAccount3.revokeTransaction(1);
//     await this.fromAccount5.revokeTransaction(1);
//     await expect(this.fromAccount4.confirmTransaction(1)).to.be.revertedWith("multiSigWallet:Transaction has been cancled by others");   
//   });

//   it("multiSigWallet:revokeTransaction function test", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.revokeTransaction(1);
//     const transactionData=await this.fromAccount1.transactionData(1);
//     console.log(transactionData)
//   });
//   it("multiSigWallet:revokeTransaction function test should revert with multiSigWallet:Only wallet owner is allowed", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await expect(this.fromAccount16.revokeTransaction(1)).to.be.revertedWith("multiSigWallet:Only wallet owner is allowed");   
//   });
//   it("multiSigWallet:revokeTransaction function test should revert with,multiSignatureWallet:Transaction does not exist", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await expect(this.fromAccount2.revokeTransaction(2)).to.be.revertedWith("multiSignatureWallet:Transaction does not exist");   
//   });
//   it("multiSigWallet:revokeTransaction function test should revert with,multiSigWallet:You have already reject the transaction", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.revokeTransaction(1);
//     await this.fromAccount3.revokeTransaction(1);
//     await expect(this.fromAccount2.revokeTransaction(1)).to.be.revertedWith("multiSigWallet:You have already reject the transaction");   
//   });
//   it("multiSigWallet:revokeTransaction function test should revert with,multiSigWallet:You have already approved the transaction", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.confirmTransaction(1);
//     await this.fromAccount3.revokeTransaction(1);
//     await expect(this.fromAccount2.revokeTransaction(1)).to.be.revertedWith("multiSigWallet:You have already approved the transaction");   
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with,multiSigWallet:Transaction is already confirmed and ready to execute", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.confirmTransaction(1);
//     await this.fromAccount3.confirmTransaction(1);
//     await expect(this.fromAccount4.revokeTransaction(1)).to.be.revertedWith("multiSigWallet:Transaction is already confirmed and ready to execute");   
//   });
//   it("multiSigWallet:confirmTransaction function test should revert with,multiSigWallet:Transaction has been cancled by others", async function () {
//     let value=ethers.utils.parseUnits("22",18);
//     const addTransaction=await this.fromAccount1.addTransaction(this.account20.address,value);
//     await this.fromAccount2.revokeTransaction(1);
//     await this.fromAccount3.revokeTransaction(1);
//     await this.fromAccount5.revokeTransaction(1);
//     await expect(this.fromAccount4.revokeTransaction(1)).to.be.revertedWith("multiSigWallet:Transaction has been cancled by others");   
//   });
// });