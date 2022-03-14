const fs = require('fs')
var kip7 = artifacts.require('KIP7');

module.exports = function(deployer) {
  deployer.deploy(kip7)
  .then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (kip7._json) {
      fs.mkdir('../frontend/deployed', { recursive: true }, (err) => {
        if (err) throw err;
      });
      // Save abi file to deployedABI.
      fs.writeFile(
        '../frontend/deployed/deployedABI',
        JSON.stringify(kip7._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${kip7._json.contractName} is recorded on deployedABI file`)
        })
      }
      fs.writeFile(
        '../frontend/deployed/deployedAddress',
        kip7.address,
        (err) => {
          if (err) throw err
          console.log(`The deployed contract address * ${kip7.address} * is recorded on deployedAddress file`)
      })
    })
}

