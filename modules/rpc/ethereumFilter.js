// # TODO
// # update metamask
// # update imports
// # update requires
var metamask = require("metamascara");
const abi = require("./abi");
const Eth = require("ethjs");
const tokenAddress = "0x....";
let eth;

window.addEventListener("load", function () {
  const provider = metamask.createDefaultProvider();
  eth = new Eth(provider);

  startApp();
});

async function startApp() {
  const token = eth.contract(abi).at(tokenAddress);
  const accounts = await eth.accounts();
  const address = accounts[0];

  const filter = token.Transfer();
  console.log("filter 1:");
  console.dir(filter);
  filter.new({ toBlock: "latest" }, (error, result) => {
    // result null <BigNumber ...> filterId
  });

  console.log("filter 2:");
  console.dir(filter);
  filter.watch((err, result) => {
    // result null FilterResult {...}
    if (result.length === 0) return;
    console.log("TRANSFER DETECTED: ");
    console.dir(result);
  });
}
