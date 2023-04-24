import React, { useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import SvgEditerr from "./Pages/SvgEditorr";
import { AuthProvider } from "./Context/useAuth";

function App() {
  const [svgCode, setSvgCode] = useState(
    `<svg width="371" height="257"><rect width="100%" height="100%" fill="white"/>
    </svg>`
  );

  const [template,setTemplate] = useState(`
    <svg width="371" height="257">
      <rect width="100%" height="100%" fill="white"/>
      <text id="text1" x="35" y="70" textAnchor="start" dominantBaseline="start" style="fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; white-space: pre;">From : </text>
      <text id="text3" x="10%" y="40%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">New Text Line</text>
      <text id="text4" x="10%" y="50%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">New Text Line</text>
      <text id="text5" x="10%" y="60%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">New Text Line</text>
    </svg>`
  );

  const [textValues, setTextValues] = useState({
  });

  const [textSize, setTextSize] = useState({
  });

  const [bold,setBold] = useState(false);
  const [textSizes, setTextSizes] = useState({});

  const handleAddText = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.createElementNS("http://www.w3.org/2000/svg", "text");
    const id = `text${Object.keys(textValues).length + 1}`;
    textNode.setAttribute("id", id);
    textNode.setAttribute("x", "10%");
    textNode.setAttribute("y", `${Object.keys(textValues).length <= 0?29 * Object.keys(textValues).length + 20:20 * Object.keys(textValues).length + 1}%`);
    textNode.textContent = "New Text Line";
    textNode.setAttribute("font-size", "25");
    doc.documentElement.appendChild(textNode);
    setSvgCode(new XMLSerializer().serializeToString(doc));
    setTextValues((prev) => ({
      ...prev,
      [id]: "New Text Line",
    }));
    setTextSize((prev) => ({ ...prev, [id]: 12 }));
  }; 
  
  const handleAddTitleText = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.createElementNS("http://www.w3.org/2000/svg", "text");
    const id = `text${Object.keys(textValues).length + 1}`;
    textNode.setAttribute("id", id);
    textNode.setAttribute("x", "10%");
    textNode.setAttribute("y", `${Object.keys(textValues).length <= 0?29 * Object.keys(textValues).length + 20:20 * Object.keys(textValues).length + 1}%`);
    textNode.textContent = "New Text Line";
    textNode.setAttribute("font-size", "44");
    textNode.setAttribute("font-weight", "bold");
    doc.documentElement.appendChild(textNode);
    setSvgCode(new XMLSerializer().serializeToString(doc));
    setTextValues((prev) => ({
      ...prev,
      [id]: "New Text Line",
    }));
    setTextSize((prev) => ({ ...prev, [id]: 12 }));
  };
  
  function makeTextBold(id) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(id);
    if (textNode) {
      textNode.setAttribute("font-weight", "bold");
      setSvgCode(new XMLSerializer().serializeToString(doc));
      setBold(true);
    }
  }

  function makeTextRegular(id) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(id);
    if (textNode) {
      textNode.setAttribute("font-weight", "");
      setSvgCode(new XMLSerializer().serializeToString(doc));
      setBold(false);
    }
  }

  function handleFontSizeChange(id, newFontSize) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(id);
    if (textNode) {
      textNode.setAttribute("font-size", newFontSize);
      setSvgCode(new XMLSerializer().serializeToString(doc));
    }
  }

  const removeText = (id) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(id);
    if (textNode) {
      textNode.parentNode.removeChild(textNode);
      setSvgCode(new XMLSerializer().serializeToString(doc));
      setTextValues((prev) => {
        const { [id]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<MainPage svgCode={svgCode} setSvgCode={setSvgCode} textValues={textValues} setTextValues={setTextValues} template={template} />} path="/main" />
          <Route element={<SvgEditerr svgCode={svgCode} setSvgCode={setSvgCode} textValues={textValues} setTextValues={setTextValues} handleAddText={handleAddText} makeTextBold={makeTextBold} makeTextRegular={makeTextRegular} bold={bold} handleTextSizeChange={handleFontSizeChange} textSizes={textSizes} handleAddTitleText={handleAddTitleText} removeText={removeText}  />} path="/edit" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}      
export default App; 
