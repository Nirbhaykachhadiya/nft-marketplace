import React from 'react'
import {Link} from "react-router-dom";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
//import Web3 from "web3";
import market from "../market.png"

const NavBar=({account})=> {
    // const [web3Api, setWeb3Api] = useState({
    //     provider: null,
    //     web3: null,
    //    //contract: null,
    //   });
   
  //console.log(account)

// const[accountt,setAccountt]=useState(account);
// console.log(accountt);

//     const setAccountListener = (provider) => {
//         provider.on("accountsChanged", (accounts) => setAccountt(accounts[0]));
//       };

      
    // const MetaMAsk=async()=>{
    // const provider = await detectEthereumProvider();
    // if (provider) {
    //   setAccountListener(provider);
    //     provider.request({ method: "eth_requestAccounts" });
        
        // setWeb3Api({
        //     web3: new Web3(provider),
        //     provider,
        //     //contract,
        //   });
    // }}
  return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:"50px" ,fontSize:"15px"}} >
  <div className="container-fluid">
    <a className="navbar-brand" href="#" style={{fontSize:"20px"}}><img src={market} height="40" weight="40"/>  &nbsp;[NIRBHAY NFT MARKETPLACE]</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">iaaa</span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{margin:"2px"}}>
        <li className="nav-item" style={{padding:"8px"}}>
          <Link className="nav-link active" aria-current="page"  to="/Home">Home</Link>
        </li>
        <li className="nav-item" style={{padding:"8px"}}>
          <Link className="nav-link"  to="/Create">Create</Link>
        </li>
        <li className="nav-item" style={{padding:"8px"}}>
          <Link className="nav-link"  to="/MyListItem">My List Item </Link>
        </li>
        <li className="nav-item" style={{padding:"8px"}}>
          <Link className="nav-link"  to="/MyPurchases">My purchase</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <div style={{color:'white',padding:"5px"}}>{account}</div>
        <button className="btn btn-outline-success" type="submit" >Connect Wallet</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default NavBar
//onClick={MetaMAsk}