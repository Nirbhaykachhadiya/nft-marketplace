import React, { useEffect, useState } from 'react'

function MyListItem({marketplace,nft,account}) {

  const[Items,setItems]=useState([]);

  const mylist=async()=>{


    const itemcount=await marketplace.itemCount();
    let items=[];

    for(let i=1;i<=itemcount;i++){

      const item=await marketplace.Items(i);
      console.log(item);
      console.log(item.seller.toLowerCase());
      if(item.seller.toLowerCase()===account.toLowerCase()){
       
       
      

        const uri=await nft.tokenURI(item.tokenId);
        console.log(uri);
        const response=await fetch(uri);
        const metadata=await response.json();
        console.log(metadata);
        const totalPrice=await marketplace.getTotalPrice(item.itemId);
        console.log(totalPrice.toString());
        items.push({
          image:metadata.image,
          name:metadata.Name,
          description:metadata.Desc,
          price:metadata.Price,
          totalPrice : totalPrice.toString(),
          itemId: item.itemId,



      })

      }
      

    }

    setItems(items);





  }






useEffect(()=>{
mylist();

},[])
useEffect(()=>{
  
 

  mylist();
},[account])



  return (
   <>
{Items.map((item)=>{

  return<>
  <div>{<img src={item.image} style={{height:"100px",width:"100px"}} alt="img"/>}</div>
  <div>  name: {item.name}</div>
  <div> description:  {item.description}</div>
  <div>price : {item.price}</div>
  <div>total price : {item.totalPrice} eth</div>
 
  </>
})}
</>
  )
}

export default MyListItem



{/* <h1>fffff</h1>
    {Items.length>0?
    <div>
      try{
  Items.map((item)=>{
    return<>
    <div>{<img src={item.image} style={{height:"100px",width:"100px"}} alt="img"/>}</div>
    <div>  name: {item.name}</div>
   
    <div> price : {item.price} eth</div>
    <div>total price : {item.totalPrice} eth</div>
     </>
 }) }
 catch(error){
  console.log("nahi thay")
 }
  </div>:"No  ITEMS YET"} */}
  //<div>total price : {item.totalPrice} eth</div>