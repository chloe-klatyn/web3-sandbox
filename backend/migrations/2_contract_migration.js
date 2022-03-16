const fs = require('fs')
var kip17Token = artifacts.require('KIP17Token');



module.exports = function(deployer) {
  deployer.deploy(kip17Token, 'KlaytnNFT', 'NFT')
  .then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (kip17Token._json) {
      fs.mkdir('../frontend/deployed', { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Save abi file to deployedABI.
      fs.writeFile(
        '../frontend/deployed/kip7TokenABI',
        JSON.stringify(kip17Token._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${kip17Token._json.contractName} is recorded on deployedABI file`)
        })
      }
      fs.writeFile(
        '../frontend/deployed/kip7TokenAddress',
        kip17Token.address,
        (err) => {
          if (err) throw err
          console.log(`The deployed contract address * ${kip17Token.address} * is recorded on deployedAddress file`)
      })
    })
}

