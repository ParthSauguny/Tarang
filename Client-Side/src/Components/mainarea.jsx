import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mainarea() {
  const [ques, setQues] = useState("");
  const [error , setError] = useState("");
  const [message , setMessage] = useState("");
  const [currTitle , setCurrTitle] = useState(null);
  const [ChatHistory , setChatHistory] = useState([]);

  function NewChat() {
    
  }

  useEffect( ()=> {
    axios.get("http://localhost:5000/chat-history")
    .then((resp) => setChatHistory(resp.data))
    .catch((error) => console.log(error));
  } , []);

  const handleChange = (e) => {
    setQues(e.target.value);
  };

  const getResponse = async() => {
    if(ques.length === 0){
      setError("Please ask a question!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/request" , {ques});
      setMessage(response.data);
      setQues("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong! Please try again later");
    }
  };

  return (
    <div className='flex flex-row'>
     <div className='bg-violet-950 flex flex-col h-screen w-1/5'>
        <button onClick={NewChat} className='mx-auto mt-4 border-4 border-slate-400 bg-black text-white rounded-2xl p-2 font-semibold font-serif'>+ New Chat</button>
        <div className='border-2 border-gray-300 text-center text-yellow-200 text-2xl mx-8 px-6 py-2 mt-4 h-screen overflow-y-scroll'>
          <ul> {
            ChatHistory.map( function(item , i){
                return (
                  <li key={i} className='border-2 border-gray-300 text-center text-yellow-200 text-2xl mx-auto px-14 py-2 mt-4'>
                    {item}
                  </li>
                );
            })
          } </ul>
        </div>
        <div className='text-center text-yellow-200 text-2xl'>
          -----------------
        </div>
        <h1 className='text-center text-rose-300'> Made by Parth Sauguny </h1>
     </div>
     <div className="bg-slate-500 w-5/6">
      <h1 className="text-center text-7xl font-semibold font-serif py-4 text-violet-950">Tarang</h1>
      <div className="h-2/3 border-2 border-black rounded-lg m-4">
        {/* Placeholder for additional content or response display */}
        {message}
      </div>

      <div className="mx-auto flex justify-center align-bottom">
        <input
          name="message"
          value={ques}
          onChange={handleChange}
          className="w-1/2 justify-center mx-4 border-2 outline-none border-black rounded-2xl text-xl"
          type="text"
          placeholder="Type your message here..."
        />
        <button
          onClick={getResponse}
          className="px-5 py-1 rounded-lg border-x-2 border-y-4 border-violet-800 hover:bg-violet-500"
        >
          ➢
        </button>
      </div>
      <h1 className='text-red-800 text-center'>{error}</h1>
     </div>
    </div>
  );
}

export default Mainarea;