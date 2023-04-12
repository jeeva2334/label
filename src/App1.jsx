import React, { useState,useRef } from 'react';

function App() {
  const [svgCode, setSvgCode] = useState(`<svg width="567" height="378">
  <rect width="100%" height="100%" fill="lightblue"/>
  <text id="my-text" x="10%" y="20%" textAnchor="start" dominantBaseline="start" fontSize="20">Hello, World!</text>
</svg>`);
const [text, setText] = useState("Hello, World!");

const handleSave = () => {
  const svgBlob = new Blob([svgCode], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "my_svg_file.svg";
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
    const textNode = doc.getElementById("my-text");
    if (textNode) {
      setText(textNode.textContent);
    }
  };
  reader.readAsText(file);
};

const handleTextChange = (event) => {
  setText(event.target.value);
  // Update the text content in the SVG code
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgCode, "image/svg+xml");
  const textNode = doc.getElementById("text");
  if (textNode) {
    textNode.textContent = event.target.value;
    setSvgCode(new XMLSerializer().serializeToString(doc));
  }
};

return (
  <div>
    <div dangerouslySetInnerHTML={{ __html: svgCode }} />
    <input type="file" accept=".svg" onChange={handleFileChange} />
    <input type="text" value={text} onChange={handleTextChange} />
    <button onClick={handleSave}>Save SVG</button>
  </div>
);
}

export default App;
