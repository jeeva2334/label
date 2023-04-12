import React, { useState,useRef } from 'react';

function App() {
    const [svgCode, setSvgCode] = useState(`<svg width="567" height="378">
    <rect width="100%" height="100%" fill="lightblue"/>
    <text id="text1" x="35" y="70" textAnchor="start" dominantBaseline="start" style="fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; white-space: pre;">From : </text>
    <text id="text2" x="10%" y="30%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 2!</text>
    <text id="text3" x="10%" y="40%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 3!</text>
    <text id="text4" x="10%" y="50%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 4!</text>
    <text id="text5" x="10%" y="60%" textAnchor="start" dominantBaseline="start" style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 24.3px;">Hello, World 5!</text>
  </svg>`);
  const [textValues, setTextValues] = useState({
    text1: "Hello, World 1!",
    text2: "Hello, World 2!",
    text3: "Hello, World 3!",
    text4: "Hello, World 4!",
    text5: "Hello, World 5!"
  });

  const handleSave = () => {
    const svgBlob = new Blob([svgCode], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "150mm x 100mm.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgCode(event.target.result);
      // Extract the text content from the SVG code
      const parser = new DOMParser();
      const doc = parser.parseFromString(event.target.result, "image/svg+xml");
      Object.keys(textValues).forEach((id) => {
        const textNode = doc.getElementById(id);
        if (textNode) {
          setTextValues((prev) => ({ ...prev, [id]: textNode.textContent }));
        }
      });
    };
    reader.readAsText(file);
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTextValues((prev) => ({ ...prev, [name]: value }));
    // Update the text content in the SVG code
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(name);
    if (textNode) {
      textNode.textContent = value;
      setSvgCode(new XMLSerializer().serializeToString(doc));
    }
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svgCode }} />
      <input type="file" accept=".svg" onChange={handleFileChange} />
      <div>
        {Object.keys(textValues).map((id) => (
          <div key={id}>
            <label htmlFor={id}>Text {id.slice()}</label>
            <input
           type="text"
           id={id}
           name={id}
           value={textValues[id]}
           onChange={handleTextChange}
         />
            </div>
    ))}
        </div>
            <button onClick={handleSave}>Save SVG</button>
        </div>
);
}

export default App