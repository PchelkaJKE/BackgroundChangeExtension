import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("red");

  const handleClick = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
    });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };

  return (
    <>
      <h1>Background Change</h1>
      <div className="card">
        <input
          type="color"
          onChange={(e) => setColor(e.currentTarget.value)}
        ></input>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </>
  );
}

export default App;
