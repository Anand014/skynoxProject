import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Canvas.css";
import { CirclePicker } from "react-color";
import { jsPDF } from "jspdf";

const Canvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [clearPath, setClearPath] = useState(false);
  const canvsRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvsRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth / 2}px`;
    canvas.style.height = `${window.innerHeight / 2}px`;
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineWidth = 5;
    contextRef.current = context;
  }, [clearPath]);

  useEffect(() => {
    const canvas = canvsRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
  }, [color]);

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const handleMouseMove = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // console.log(offsetX, offsetY);
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  };
  const clearContext = () => {
    setClearPath((prev) => !prev);
  };

  const clickHandler = async () => {
    const imgData = canvsRef.current.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [18, 10],
    });
    pdf.addImage(imgData, "PNG", 1, 1);
    pdf.save("download.pdf");
  };

  return (
    <>
      <CirclePicker
        className="color"
        color={color}
        onChange={(updatedColor) => setColor(updatedColor.hex)}
      />
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvsRef}
      ></canvas>
      <div className="btndiv">
        <button className="clear" onClick={clearContext}>
          Clear
        </button>
        <button className="btn" onClick={clickHandler}>
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Canvas;
