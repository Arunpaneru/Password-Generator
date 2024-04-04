import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //userefhook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charactersAllowed) {
      str += "!@#$%^&*~+=-_";
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed, setPassword]);

  const copyPwToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    alert("Password copied to clipboard !");
    // passwordRef.current?.setSelectionRange(0,6);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center h-screen p-8">
        <div className="   max-w-lg sm:max-w-xl w-full mx-auto  rounded-lg bg-blue-200 text-orange-600   ">
          <h1 className="text-gray-800 my-3 text-center font-bold font-mono text-2xl">
            Password Generator
          </h1>

          <div className="flex shadow rounded-lg   mb-4 ">
            <input
              type="text"
              value={password}
              className="outline-none w-full px-3 py-1 rounded-md "
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-600 text-white px-4 py-0.5 shrink-0 rounded"
              onClick={copyPwToClipBoard}
            >
              Copy
            </button>
          </div>
          <div className=" flex flex-col text-md p-4 gap-x-2 sm:flex sm:flex-row sm:">
            <div className="sm:flex sm:items-center flex flex-col gap-x-1">
            <label htmlFor="pwlength">length: {length}</label>
              <input
                id="pwlength"
                type="range"
                min={8}
                max={25}
                value={length}
                className="cursor-point"
                onChange={(event) => {
                  setLength(event.target.value);
                }}
              />
              
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">numbers</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charactersAllowed}
                id="characterAllowed"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
               <label htmlFor="characterAllowed">characters</label>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
