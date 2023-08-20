import { useState, useEffect } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", handleClick);
  }, []);

  const [dots, setDots] = useState([]);
  const [cache, setCache] = useState([]);

  const handleClick = ({ clientX, clientY }) => {
    const newDot = {
      x: clientX,
      y: clientY,
    };
    setDots((prevDots) => [...prevDots, newDot]);
  };

  const handleUndo = (e) => {
    if (dots.length) {
      const dotToCache = dots.pop();
      setCache((prevCache) => [...prevCache, dotToCache]);
      setDots((prevDots) => [...prevDots]);
    }
  };

  const handleRedo = (e) => {
    if (cache.length) {
      const dotToRestore = cache.pop();
      setDots((prevDots) => [...prevDots, dotToRestore]);
      setCache((prevCache) => [...prevCache]);
    }
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div className="canvas" id="canvas">
        {dots.length &&
          dots.map((dot, i) => {
            return (
              <div
                className="dot"
                style={{ left: `${dot.x}px`, top: `${dot.y}px` }}
                key={`dot-${i}`}
              ></div>
            );
          })}
      </div>
    </>
  );
}

export default App;
