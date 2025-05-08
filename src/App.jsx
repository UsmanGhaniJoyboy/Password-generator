import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //copy to clipboard password

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(Password).then(() => {
      alert("Password copied to clipboard");
    });
  }, [Password]);

  //Function 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, charAllowed]);

  //useEffect
  useEffect(() => {
    console.log("bro?");
    passwordGenerator();
  }, [length, charAllowed, numbers]);

  return (
    <>
      <h1 className="text-4xl text-center bold">Password generator</h1>
      <div className="w-auto  max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden p-4 mb-4">
          <input
            type="text"
            placeholder="Password"
            className="bg-white w-full outline-none text-black p-2.5  rounded-l-md border-none"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="outline-none bg-cyan-600 p-4 cursor-pointer text-white rounded-r-md hover:bg-cyan-700 "
            onClick={copyToClipboard}
          >

            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              id="range"
              className="cursor-pointer "
              onChange={(e) => setLength(e.target.value)}
              value={length}
            />
            <label htmlFor="range" className="text-white">
              Length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numbers"
              className="cursor-pointer"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label htmlFor="numbers" className="text-white">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charAllowed"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charAllowed" className="text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
