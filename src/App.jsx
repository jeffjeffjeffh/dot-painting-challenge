import { useState, useEffect } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", handleClick);
    return () => canvas.removeEventListener("mousedown", handleClick);
  }, []);

  const [dots, setDots] = useState([]);
  const [dotIndex, setDotIndex] = useState(0);

  const handleClick = ({ offsetX, offsetY }) => {
    const newDot = {
      x: offsetX,
      y: offsetY,
    };

    setDots((prev) => {
      if (dotIndex !== prev.length) {
        prev[dotIndex] = newDot;
        return [...prev];
      } else {
        return [...prev, newDot];
      }
    });
    setDotIndex((prev) => prev + 1);
  };

  const handleUndo = (e) => {
    if (dotIndex > 0) {
      setDotIndex((prev) => prev - 1);

      setDots((prev) => {
        prev[dotIndex] = {
          ...prev[dotIndex],
          hidden: true,
        };
        return [...prev];
      });
    }
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleUndo}>Undo</button>
        {/* <button onClick={handleRedo}>Redo</button> */}
      </div>
      <div className="canvas" id="canvas">
        {dots.map((dot, i) => {
          if (!dot.hidden) {
            return (
              <div
                className="dot"
                style={{ left: `${dot.x}px`, top: `${dot.y}px` }}
                key={`dot-${i}`}
              ></div>
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
