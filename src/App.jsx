import React from "react";
import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Copy");
  const [btnColor, setBtnColor] = useState("bg-blue-700")
  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if (charAllowed) str += "!~`@#$^%&*()+=_-]{[}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    setBtnText("Copy")
    setBtnColor("bg-blue-700")

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(password);
  
  const copyPassToClipBoard = ()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)

    window.navigator.clipboard.writeText(password)
    setBtnText("copied");
    setBtnColor("bg-blue-900");
  }
  useEffect(()=> {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return ( <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className=" text-center my-3 text-white">Password Generator</h1>
      <div className="flex shadow rounded—lg overflow—hidden mb—4">
    <input 
    type="text" 
    value={password}
    className="outline-none w-full py-1 px-3 mb-4"
    placeholder="Password"
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPassToClipBoard}
    id="copyBtn"
    className={`outline-none ${btnColor} text-white px-3 py-0.5 shrink-0 mb-4`}
    >{btnText}</button>
    </div>

    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input 
        type="range" 
        min={8}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={ (e)=> {
          setLength(e.target.value)
        }}/>
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=> {
          setNumberAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor="characterInput">Numbers</label>
        <input type="checkbox" 
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=> {
          setcharAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor="characterInput">Characters</label>
        
      </div>
    </div>
    <div className="flex my-4">
    <span className="text-sm py-3.5 px-2 mb-4 text-blue-600">Twitter: </span>
        <footer className="text-xs my-4 px-1 py-0.5 shrink-0 text-blue-200">@debmalyasen37</footer>
    </div>
        
    </div>
  </>)
}

export default App;
