import React,{useState,useEffect} from 'react'
import web3 from "web3";

const Home=({marketplace, nft,account })=> {

  const [items, setItems] = useState([])
  const[Reload,setReload]=useState(false)
  //console.log(nft.tokenCount());

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    //const token=await nft.tokenCount();
    //const item = await marketplace.Items(1);
    //console.log(item);
    //console.log(itemCount);
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.Items(i)
      if (!item.sold) {
        // get uri url from nft contract
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
          totalPrice:totalPriceFianl.toString(),
        })
       }
    }
    setItems(items)
  }


  const buyMarketItem = async (item) => {
   await marketplace.purchaseItem(item.itemId,{from:account,value:web3.utils.toWei(item.totalPrice,"ether")});
   // loadMarketplaceItems()
   setReload(!Reload);
  }

  useEffect(() => {
    loadMarketplaceItems()
    
  }, [])
  useEffect(() => {
    loadMarketplaceItems()
  }, [Reload])


  return (


    <>
    <h1>fffff</h1>
    {items.length>0?
  <div>
  {items.map((item)=>{
    return<>
    <div>{<img src={item.image} style={{height:"100px",width:"100px"}} alt="img"/>}</div>
    <div>  name: {item.name}</div>
    <div> description:  {item.description}</div>
    <div> price : {item.totalPrice} eth</div>
    <button onClick={()=>buyMarketItem(item)}> Buy Now for{item.price} eth</button>
    </>

  })}
    
  </div>
  
  :"No LISTED ITEMS YET"}
    </>
  )
}

export default Home