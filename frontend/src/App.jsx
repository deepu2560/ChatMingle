import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    let body = document.body;
    if (theme) {
      body.style.setProperty("--text-color", "#393939");
      body.style.setProperty("--background-color", "#f5f5f5");
    } else {
      body.style.setProperty("--text-color", "#f5f5f5");
      body.style.setProperty("--background-color", "#393939");
    }
  }, [theme]);

  return (
    <div className="App">
      <h1 className="text-center text-black "> Hello world</h1>
      <button onClick={() => setTheme(!theme)}>toggle</button>
    </div>
  );
}

export default App;
