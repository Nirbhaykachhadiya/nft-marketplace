import React,{useState} from 'react'
import web3 from 'web3';
import { Buffer } from 'buffer';
import { ethers } from "ethers"
//import { create as ipfsHttpClient } from 'ipfs-http-client'
const ipfsClient = require('ipfs-http-client');

const projectId = '2Dq2ycrfkhzFhOMnAJMTOfs2zgg' ;
const projectSecret = 'f267d62601f83b9e213026f3583618e5';
const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});


  const Create = ({ marketplace, nft ,account}) => {
    console.log(web3.utils.toChecksumAddress(nft.address))
    const nftt=nft.address;
    const [image, setImage] = useState('')
    const [Price, setPrice] = useState(null)
    const [Name, setName] = useState('')
    const [Desc, setDesc] = useState('')
    console.log(Price);
    

    const uploadToIPFS = async (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if (typeof file !== 'undefined') {
        try {
          const result = await client.add(file)
          console.log(result)
          setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
        } catch (error){
          console.log("ipfs image upload error: ", error)
        }
      }
    }
    const createNFT = async () => {
      if (!image || !Price || !Name || !Desc) return
      try{
        const result = await client.add(JSON.stringify({image, Price, Name, Desc}))
        mintThenList(result)
      } catch(error) {
        console.log("ipfs uri upload error: ", error)
      }
    }
    const mintThenList = async (result) => {
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
      // mint nft 
      await(await nft.mint(uri,{from:account}));
      // get tokenId of new nft 
      const id = await nft.tokenCount();
      // approve marketplace to spend nft
      await nft.setApprovalForAll(marketplace.address, true,{from:account});
      // add nft to marketplace
      const listingPrice = web3.utils.toWei(Price,"ether");

      //web3.utils.toWei(Price)
      console.log(listingPrice);
      

      await marketplace.makeItem(nftt, id, listingPrice,{from:account});

    }








  return (
    <>
    <br/>
    <div style={{background:"yellow",padding:"10px",border:"solid black",fontSize:"20px" ,alignItems:"center",justifyContent:"center"}}>
    <div>
      <label for="myfile">Select a file of NFT :  </label>
      <input type="file" id="myfile" name="myfile" onChange={uploadToIPFS}/>
    </div>
    <hr/>

    <div>
      <lable>Name : </lable>
      <input type ="text" style={{width:"470px"}} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name Of NFT'/></div>
    <hr/>

    
    <div style={{justifyContent:"center",alignItems:"center", marginRight:"50px"}}>
      <lable>Desc : </lable>
      <textarea placeholder='Enter description Of NFT' onChange={(e)=>setDesc(e.target.value)} rows="4" cols="50"/></div>
    <hr/>

    
    <div>
      <lable>Price : </lable>
      <input type ="number" onChange={(e)=>setPrice(e.target.value)} min="1"placeholder='Enter Price Of NFT(ETH)'/></div>
    <hr/>

    
    <div><button onClick={createNFT} >Create & List NFT</button></div>
    <hr/>
    </div>
    </>
  )
}

export default Create