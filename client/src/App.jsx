import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Create from "./components/Create";
import MyListItem from "./components/MyListItem";
import MyPurchases from "./components/MyPurchases";
import Home from "./components/Home";

function App() {


  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
   NFT: null,
   MARKETPLACE:null,
  });

  const marketplace=web3Api.MARKETPLACE;
  console.log(marketplace);
  const nft=web3Api.NFT;
  console.log(marketplace);
  const [account, setAccount] = useState(null);
  //const[ram,setram]=useState(false)
 
  //const [place,setPlace]=useState();
  //const [final,setfinal]=useState();
  //const[reload,setreload]=useState(false)
  //const[fale,setfale]=useState(false)



  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
    
  };



  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
     const NFT = await loadContract("NFT", provider);
     console.log(NFT);
     
     const MARKETPLACE = await loadContract("MARKETPLACE", provider);
     console.log(MARKETPLACE);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          NFT,
          MARKETPLACE,
        });
        
       
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
    
  },[]);




  return(
    <Router>
    <>
 
    <NavBar account={account} />
    <Routes>
         
    {account==null ?"":<Route path='/Home' element={<Home nft={nft} marketplace={marketplace} account={account}/>} />}
          {account==null ?"":<Route path='/Create' element={<Create nft={nft} marketplace={marketplace} account={account}/>} />}
          {account==null ?"":<Route path='/MyListItem' element={<MyListItem  nft={nft} marketplace={marketplace} account={account}/>} />}
          {account==null ?"":<Route path='/MyPurchases' element={<MyPurchases nft={nft} marketplace={marketplace} account={account}/>} />}
          
        </Routes>
    </>
    </Router>


  )
}
export default App;
