const { expect } = require("chai");
const { ethers,waffle } = require("hardhat");
const provider=waffle.provider;

describe("Greeter", function () {
  beforeEach("Deploying contract for unit testing",async function(){
    [this.account1,this.account2,this.account3,this.account4,this.account5,this.account6,this.account7,this.account8,
      this.account9,this.account10,this.account11,this.account12,this.account13,this.account14,this.account15,this.account16,
      this.account17,this.account18,this.account19,this.account20]=await ethers.getSigners();
      const Greeter = await ethers.getContractFactory("Greeter");
    this.deploedGreeter = await Greeter.deploy("Hello, world!");
    await this.deploedGreeter.deployed();
  })
  it("Should return the greeting", async function () {
    let greet=await this.deploedGreeter.greet();
    expect(greet).to.equal("Hello, world!");
  });

  it("Should return the greeting", async function () {
    await expect(this.deploedGreeter.setGreeting("no")).to.be.revertedWith("Greeter: 10 minutes has not been passed")
  });
});
