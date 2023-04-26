const { WsProvider, ApiPromise } = require("@polkadot/api");
const { decodeAddress, encodeAddress, Keyring } = require("@polkadot/keyring");
const {
  mnemonicToMiniSecret,
  ed25519PairFromSeed,
} = require("@polkadot/util-crypto");
let api;
(async () => {
  console.log("hehuhuh");
  let wsProvider = new WsProvider("ws://localhost:9944");
  api = await ApiPromise.create({
    provider: wsProvider,
    signedExtensions: {
      CheckMortality: {
        extrinsic: {
          era: "ExtrinsicEra",
        },
        payload: {
          blockHash: "Hash",
        },
      },
      CheckNonce: {
        extrinsic: {
          nonce: "Compact<Index>",
        },
        payload: {},
      },
      ChargeAssetTxPayment: {
        extrinsic: {
          tip: "Compact<Balance>",
          // eslint-disable-next-line sort-keys
          assetId: "Option<AssetId>",
        },
        payload: {},
      },
    },
  });
  console.log("api", api.isConnected);
})();

const transfer = async () => {
  //const data= await api.tx.assets.transferKeepAlive()
  try {
    const seedUser = mnemonicToMiniSecret(
      "wasp vital paper hip rich poverty pluck cushion vehicle equip another bottom"
    );
    const { publicKey } = ed25519PairFromSeed(seedUser);
    const publicAddress = encodeAddress(decodeAddress(publicKey));
    console.log("publicAddress", publicAddress);
    const keyring = new Keyring({ type: "ed25519" });
    const userKeyring = keyring.addFromPair(ed25519PairFromSeed(seedUser));
    const balance = await api.query.system.account(publicAddress);
    const data = await api.tx.assets.transferKeepAlive(
      "4",
      "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      (10 * 10 ** 18).toString()
    );
   const txHash= await data.signAndSend(userKeyring)
    console.log("hey", `${txHash}`);
  } catch (error) {
    console.log("error", error.toString());
  }

};
setTimeout(() => {
  transfer();
}, 3000);
