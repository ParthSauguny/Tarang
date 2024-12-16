import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mainarea() {
  const [ques, setQues] = useState("");
  const [error , setError] = useState("");
  const [ChatHistory , setChatHistory] = useState([]);
  const [message , setMessage] = useState("");
  const [currTitle , setCurrTitle] = useState(null);

  const handleChange = (e) => {
    setQues(e.target.value);
  };

  useEffect( () => {
    console.log("nice");
    if(!currTitle && ques && message){
      setCurrTitle(ques);
    }
    console.log(currTitle , ques , message);
    if(currTitle && ques && message){
      setChatHistory(oldHistory => (
       [
        ...oldHistory,
        {
          title: currTitle,
          role: 'user',
          parts: [ques]
        },
        {
          title: currTitle,
          role: 'Tarang',
          parts: [message]
        }
      ]
    ));
  }
  console.log(ChatHistory);
  } , [message , currTitle]);

  const getResponse = async() => {
    if(ques.length === 0){
      setError("Please ask a question!");
      return;
    }
    try {
      //console.log("starting");
      const response = await axios.post("http://localhost:5000/request" , {ques});
      console.log("ans: " , response.data);
      setMessage(response.data);
      
      setQues("");
      //console.log("level 1");
    } catch (error) {
      console.log(error);
      setError("Something went wrong! Please try again later");
    }
  };

  return (
    <div className="bg-slate-500 w-5/6">
      <h1 className="text-center text-7xl font-semibold font-serif py-4 text-violet-950">Tarang</h1>
      <div className="h-2/3 border-2 border-black rounded-lg m-4">
        {/* Placeholder for additional content or response display */}
        {message}
      </div>

      <div className="mx-auto flex justify-center align-bottom">
        <input
          name="message"  // Added 'name' attribute to link with state update
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
      <h1 className='text-red-800 text-center'>{error} !</h1>
    </div>
  );
}

export default Mainarea;