const {ethers} = require("hardhat")
async function main(){
    //getThe Contract
    const PropertyContract = await ethers.getContractFactory("Property");
    //deploy the contract
    const PropertyContractDeploy = await PropertyContract.deploy();
    //await deployment
    await PropertyContractDeploy.deployed();
    //console the address
    console.log("PropertyAddress:",PropertyContractDeploy.address );
}
//call main
main().
then(()=> process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})