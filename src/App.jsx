import React, { useState, useRef } from "react";
// import PrintPDFF from "./Printer";
import PrintButton from "./Print";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SvgEditer from "./SvgEditer";

function App() {
  const [svgCode, setSvgCode] = useState(
    `<svg width="371" height="257"><rect width="100%" height="100%" fill="white"/>
      <text id="text1" x="35" y="70" textAnchor="start" dominantBaseline="start" style="fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; white-space: pre;">From : </text>
      <text id="text2" x="10%" y="30%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 2!</text>
      <text id="text3" x="10%" y="40%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 3!</text>
      <text id="text4" x="10%" y="50%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 4!</text>
      <text id="text5" x="10%" y="60%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 5!</text>
    </svg>`
  );
  const [textValues, setTextValues] = useState({
    text1: "From : ",
    text2: "Hello, World 2!",
    text3: "Hello, World 3!",
    text4: "Hello, World 4!",
    text5: "Hello, World 5!",
  });
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<SvgEditer svgCode={svgCode} setSvgCode={setSvgCode} textValues={textValues} setTextValues={setTextValues} />} path="/" />
        <Route element={<PrintButton svgCode={svgCode} />} path="/print" />
      </Routes>
    </BrowserRouter>
  )
}      
export default App; 
