import React, { useState, useEffect } from 'react';
import './Home.css';
import web3 from '../utils/web3';
import lottery from '../utils/lottery';

function Home () {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [length, setLength] = useState("");
  //const [role, setRole] = useState("")
  
  const owner ="0x55247631aA851d40928427e010f47d4aB987EFa0"
   



  const gettingPlayers = async () => {
    const players = await lottery.methods.getPlayers().call();
    let accounts = await window.ethereum.enable();
    setLength(players.length);
    // if (accounts[0].toString().lowerCase() == owner.toString().toLowerCase()) {
    //   setRole("block");
    // }else{
    //   setRole("hidden")
    // }
    if (
      players.length == 3) {
        pickWinner();
      
    }
  };
  useEffect(() => {
    gettingPlayers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let accounts;
    try{
      accounts = await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    } 
    setMessage("Processing please wait...");
    console.log(web3.utils.toWei(amount, "ether"));
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, "ether"),
    });
    setMessage("Successfully registered among players.")
  
  };
  const pickWinner = async () => {
    let accounts;
    try {
      accounts =  await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }
    setMessage("Selecting winner among all players, please wait... maximum 1 minute");
    await lottery.methods.PickWinner().send({
      from: accounts[0],
    });
    setMessage("The winner is found!");

  };
    return (
     <div className="model h-full w-full">
      <h1 >Lottery</h1>
       <div className="h-full w-full flex flex-col item-center justify-center">
         <div className="text-white font-bold text-4xl">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
        
               <input 
                  className="mt-7 appearence-none block w-full bg-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
                  
                  <button className="bg-block w-full m-9 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
                  Enter
                  </button>
                  </div>
         </form>
        
     <h1 className="text-white font-bold">{message}</h1>
     <p className="text-white font-bold">Now we have {length} players in this lottery circle.</p>
     <p className="text-white font-bold p-4"> When the number of players reach to 3 we choose the winner. </p>
     </div>
     </div>
     </div>
   
   );

 } 

 
export default Home;