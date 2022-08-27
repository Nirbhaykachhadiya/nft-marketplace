import React,{useState,useEffect} from 'react'
import web3 from "web3";

const  MyPurchases=({marketplace,nft,account})=> {

  const [Items,setItems]=useState([]);

  const mypurchase=async()=>{

    const itemcount =await marketplace.itemCount();


    let items=[];

    for(let i=1;i<=itemcount;i++){
      const item=await marketplace.Items(i);
      const owner=await nft.ownerOf(item.tokenId);
      console.log(owner.toLowerCase())
      if(owner.toLowerCase()===account.toLowerCase()){
       // console.log(owner)
        const uri = await nft.tokenURI(item.tokenId)
        
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
       console.log(metadata.Price)
        // get total price of item (item price + fee)
   const totalPrice = await marketplace.getTotalPrice(item.itemId)
   const totalPriceFianl=web3.utils.fromWei(totalPrice,"ether");
   console.log(totalPriceFianl.toString())
        // Add item to items array
        items.push({
          price:item.price.toString(),
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.Name,
          description: metadata.Desc,
          image:  metadata.image,
          totalPrice:totalPriceFianl,
        })
       }
    }
    setItems(items)


      

    }






  

useEffect(()=>{
  
 

  mypurchase();
},[])


useEffect(()=>{
  
 

  mypurchase();
},[account])






  return (
    <>
    {console.log(Items.length)}
{Items.map((item)=>{

  return<>
  <div>{<img src={item.image} style={{height:"100px",width:"100px"}} alt="img"/>}</div>
  <div>  name: {item.name}</div>
  <div> description:  {item.description}</div>
  
  <div> price of purchase : {item.totalPrice} eth</div>
 
  </>
})}
</>
  )
}

export default MyPurchases