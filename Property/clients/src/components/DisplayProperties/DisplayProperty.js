import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState,useRef,useCallback } from "react";
import Web3 from 'web3'
import Abi from "../contract.abi.json";
import erc20 from "../erc20.abi.json";
import DisplayTemplate from "./DisplayTemplate"
// //import { newKitFromWeb3 } from '@celo/contractkit'
import {newKitFromWeb3} from "@celo/contractkit"
//import {newKitFromWeb3} from "@celo-tools/use-contractkit"
 import BigNumber from "bignumber.js"
// const Web3 = require("web3");
// const newKitFromWeb3 = require("@celo/contractkit");


const ERC20_DECIMALS = 18

let kit
let contract

const DisplayProperty =()=>{
    const contractAddress= "0xcAb2bd12D75770e69e445e6Ef01583e0e6171f89"//"0x1939b8F5C4001cDBB419Ed7b597DC371a76dA65a";
    const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    const [properties,setproperties] = useState([]);
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
      const notification =(_text)=>{
        alert(_text);
      }
      //function delete property
      const deleteProperty =async(_index)=>{
       try{
        await contract.methods.deleteProperty(_index).send({from: kit.defaultAccount});
       }catch(error){
        console.log(error);
        alert(error);
       }
      }
      //function buy property
      const buyProperty =async (_index)=>{
        const cusdContract = new  kit.web3.eth.Contract(erc20,cUSDContract);
        const cost = properties[_index].price;
        await cusdContract.methods.approve(contractAddress,cost).send({from : kit.defaultAccount});


         await contract.methods.buyProperty(_index).send({from: kit.defaultAccount});

      }
    //getAllProperties
    const getAllProperties = useCallback( async() =>{
        const propertyLength = await contract.methods.propertyLength().call();
    const _property = [];
    for (let index = 0; index < propertyLength; index++) {
      let _properties = new Promise(async (resolve, reject) => {
      let propertyItem = await contract.methods.readProperty(index).call();

        resolve({
          index: index,
          owner: propertyItem[0],
          name: propertyItem[1],
          image: propertyItem[2],
          description: propertyItem[3],
          price: propertyItem[4]  
        });
      });
      _property.push(_properties);
    }


    const _Property = await Promise.all(_property);
    setproperties(_Property);
  }, [contract]);

        useEffect(()=>{
            notification("⌛ Loading...");
            const fetchData =async()=>{
                await connectCeloWallet();
               await getAllProperties();
                
            };
            fetchData();
            alert(properties);
                
            },[])
        // window.addEventListener('load', async () => {
        //     notification("⌛ Loading...")
        //     await connectCeloWallet()
        //     await getAllProperties()
            
        //   });
    return <div>
        <DisplayTemplate properties={properties} buyProperty={buyProperty} deleteProperty={deleteProperty}/>
    </div>
}
export default DisplayProperty;