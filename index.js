const {WsProvider,ApiPromise}=require("@polkadot/api")
const { decodeAddress, encodeAddress, Keyring }=require('@polkadot/keyring');
const {
   mnemonicToMiniSecret,
   naclKeypairFromSeed,
} =require('@polkadot/util-crypto');
let api;
(async()=>{
    console.log("hehuhuh")
    let wsProvider=new WsProvider("ws://35.167.229.15:9944")
   api=await ApiPromise.create({ provider: wsProvider });
    console.log("api",api)
})();

const transfer=async ()=>{
    for(let i=0;i<200;i++){
        try{
            let wsProvider=new WsProvider("ws://44.241.191.65:9944")
          let api= await ApiPromise.create({ provider: wsProvider });
         

             console.log("api",api?api.isConnected:null)
             console.log("hey",await api.query.system.account("5CfdmLCVp8ktgTydLgiunGp27s4NitjboNZ6KNVM1un3eHdi"))
        }
        catch(err){

        }
    }
   
//     try{
//         console.log("api",api)
//     const userMnemonic ="ghost virtual cable party sun under tourist bicycle pause swap apple sound";
//     const seedUser = mnemonicToMiniSecret(userMnemonic);
//     const { publicKey } = naclKeypairFromSeed(seedUser);
//     const publicAddress = encodeAddress(decodeAddress(publicKey));
//     const value=3             // amount to be transfer
//     const keyring = new Keyring({ type: 'ed25519' });
//     const userKeyring = keyring.addFromPair(
//        naclKeypairFromSeed(seedUser)
//     );
//    const transfer= await api.tx.balances.transferKeepAlive(
//         "5Hopigui4WamV398AmLpYgscFWYprLaXfc8ij8NkxY8knnEQ",    // to address
//         (Number(value) * Math.pow(10, 18)).toString()
//      );

//   const txHash = await transfer.signAndSend(userKeyring);
//   console.log("Balance transfer Successfully",txHash.toString())
//    }
//    catch(err){
//     console.log("error",err.toString())
//    }


}
// setTimeout(()=>{
    transfer()
// },3000)
