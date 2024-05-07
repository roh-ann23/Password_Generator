// import './App.css'

import { useCallback, useEffect, useRef, useState } from "react"

function App() {
    const [length, setLength] = useState(8);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(()=>{   // we used useCallback for optimisation and memorization.. it store the value in cache 
        let pass = ''; 
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if(numbersAllowed) str += '0123456789';
        if(charAllowed) str +=" '!@#$%^&*(){}?':"

        for (let i = 0; i <= length; i++) {
          let char = Math.floor(Math.random() * str.length + 1); // from here we get a index number of that char
          pass += str.charAt(char);  // here he get char from that index
        }

        setPassword(pass); // password updation while taking that "pass" argument which wee created in loop 

    }, [length,numbersAllowed,charAllowed,setPassword]) // we use setPassword as dependency just for         optimisation and its only mandatory field

    // we used this function for reference hook and also when we click on copy button this will invoked
    const copyPasswordToClipboard = useCallback(()=>{
        
      passwordRef.current?.select();  // this will select the input field when we click on copy button 
      // and also we take question mark on current on cause in some cases it shoold be null that time it'll be optional
      passwordRef.current?.setSelectionRange(0,10); // This will select the particular range of input text...here it'll select 0 to 10..only select not copy
      window.navigator.clipboard.writeText(password);  // This line will copy the text which is in the input
      
    },[password])

    




// useEffect() is a hook which is used to run our fnc and also it re-render our site  
    useEffect(()=>{
      passwordGenerator();
    },[length,numbersAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-3 my-8 bg-gray-800 text-orange-500 main">
        <h1 className='text-white text-center my-4 text-3xl ' >Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">

              <input type="text" 
              className="outline-none w-full py-1 px-3 "
              value={password} 
              onChange={()=>{setPassword(pass)}}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              />
              <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 copy-btn">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          className="cursor-pointer"
          />
          <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numbersAllowed}
            id="numberInput"
            onChange={()=> 
              {
                setNumbersAllowed((prev) => !prev)
              }
            }
            className="cursor-pointer"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            id="charInput"
            onChange={()=> 
              {
                setCharAllowed((prev) => !prev)
              }
            }
            className="cursor-pointer"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App

{/* <h1 className='text-4xl text-center text-white heading'>Password Generator</h1> */}