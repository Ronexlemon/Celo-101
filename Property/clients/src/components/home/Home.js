import React from "react"
import "./home_module.css";
import { useNavigate } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import Web3 from 'web3'
import Abi from "../contract.abi.json";
// //import { newKitFromWeb3 } from '@celo/contractkit'
import {newKitFromWeb3} from "@celo/contractkit"
//import {newKitFromWeb3} from "@celo-tools/use-contractkit"
 import BigNumber from "bignumber.js"
// const Web3 = require("web3");
// const newKitFromWeb3 = require("@celo/contractkit");

const ERC20_DECIMALS = 18

let kit
let contract

const Home = ()=>{
    const contractAddress= "0xcAb2bd12D75770e69e445e6Ef01583e0e6171f89";//"0x1939b8F5C4001cDBB419Ed7b597DC371a76dA65a";
    const [account,setAccounts] = useState(0);
    const [properties,setproperties] = useState([]);
    const [propertyname,setpropertyname] = useState('');
    const [propertyurl,setpropertyurl] = useState('');
    const [propertydescription,setpropertydescription] = useState('');
    const [propertyprice,setpropertyprice] = useState('');
    const formref =useRef(null);
    const navigate = useNavigate();
    
    const handleAddProperty = (e) => {
        //prevent page refresh
        e.preventDefault();

    }
    const notification=(_test)=>{
        alert(_test);
    }
    const connectCeloWallet = async function () {
        if (window.celo) {
          notification("⚠️ Please approve this DApp to use it.")
          try {
            await window.celo.enable()
            alert("Window is celo");
      
            const web3 = new Web3(window.celo);
            kit = newKitFromWeb3(web3);
      
            const accounts = await kit.web3.eth.getAccounts();
            kit.defaultAccount = accounts[0];
            // setAccounts(accounts[0]);
            contract = new kit.web3.eth.Contract(Abi,contractAddress);
      
          } catch (error) {
            notification(`⚠️ ${error}.`)
          }
        } else {
          notification("⚠️ Please install the CeloExtensionWallet.")
        }
      }
      const getBalance = async function () {
        const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
        const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
        setAccounts(cUSDBalance);
      }
      const addProperty = async () =>{
        const params =[
            propertyname,
            propertyurl,
            propertydescription,
            new BigNumber(propertyprice)
      .shiftedBy(ERC20_DECIMALS)
      .toString()
        ]
        notification(`⌛ Adding "${params[0]}"...`);
        try {
            const result = await contract.methods
              .writeProperty(...params)
              .send({ from: kit.defaultAccount })
          } catch (error) {
            notification(`⚠️ ${error}.`)
          }
          notification(`🎉 You successfully added "${params[0]}".`)
          
        
      }
      const getTotalLength = async()=>{
        const    _propertyLength= await contract.methods.propertyLength().call();
        alert(_propertyLength);
      }
    //()=>navigate("/DisplayProperty")
    const openForm = ()=>{
       
        formref.current.style.display ="block"
    }
    const closeForm = ()=>{
        formref.current.style.display ="none"
        alert(propertyname)
    }
   useEffect(()=>{
    notification("⌛ Loading...");
    const fetchData =async()=>{
      await  connectCeloWallet(); 
       await  getBalance();
       await getTotalLength();
        
    };
    fetchData();
        
    },[])
    // window.addEventListener('load', async () => {
    //     notification("⌛ Loading...")
    //     await connectCeloWallet()
    //     await getBalance()
        
    //   });
    return(
<div  className="MainHomeDiv">
<header className="header">balance<h1>{account}</h1></header>
    <div className="AboutTheApp">
        <h2>A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs</h2>

    </div>
    <div ref={formref} className="formAdd">
        
        <form onSubmit={handleAddProperty}>
<label>PropertyName</label><br/>
<input className="form-input" type="text" id="company" name="propertyname" placeholder="Property Name..." required onChange={(e) => setpropertyname(e.target.value)} value={propertyname} /><br />
<label>PropertyImageUrl</label><br/>
<input type="text"  name="image" placeholder="https//image.co..." required onChange={(e) => setpropertyurl(e.target.value)} value={propertyurl}/><br/>
<label>PropertyDescription</label><br/>
<input type="text" name="description"  required onChange={(e) => setpropertydescription(e.target.value)} value={propertydescription}/><br/>
<label>PropertyPrice</label><br/>
<input type="text" name="price"  required onChange={(e) => setpropertyprice(e.target.value)} value={propertyprice}/><br/>
<div className="buttons">
<button id="btnclose" onClick={closeForm}>Close</button>
<button onClick={addProperty} id="btnopen">Post</button>

</div>


        </form>
         
    </div>
    <div className="buttonAdd">
<button onClick={openForm}>Add Property</button>
<button onClick={()=>navigate("/DisplayProperty")}>Show</button>
    </div>

</div>
    )

}
export default Home;