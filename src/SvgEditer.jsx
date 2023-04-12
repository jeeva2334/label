import React, { useState, useRef } from "react";
import PrintButton from "./Print";
import { Link } from "react-router-dom";

function SvgEditer({svgCode,setSvgCode,textValues,setTextValues}) {


  const handleSave = () => {
    const svgBlob = new Blob([svgCode], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "100mm x 70mm.svg";
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
    setTextValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Update the text element in the SVG code
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const textNode = doc.getElementById(name);
    if (textNode) {
      textNode.textContent = value;
      const attributes = textNode.attributes;
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes.item(i);
        if (attribute.nodeName !== "id" && attribute.nodeName !== "textContent") {
          textNode.setAttribute(attribute.nodeName, attribute.nodeValue);
        }
      }
      setSvgCode(new XMLSerializer().serializeToString(doc));
    }
  };

    const handlePrint = () => {
      const printContent = document.createElement("div");
      printContent.innerHTML = svgCode;
      document.body.appendChild(printContent);
      window.print();
      document.body.removeChild(printContent);
    };
  
    
  const handleSvgCodeChange = (event) => {
    setSvgCode(event.target.value);
      // Extract the text content from the SVG code
      const parser = new DOMParser();
      const doc = parser.parseFromString(event.target.value, "image/svg+xml");
      Object.keys(textValues).forEach((id) => {
      const textNode = doc.getElementById(id);
      if (textNode) {
      setTextValues((prev) => ({ ...prev, [id]: textNode.textContent }));
      }
      });
      };
      
      const svgRef = useRef(null);
      
      return (
      <div>
      <div>
      {/* <textarea
      value={svgCode}
      onChange={handleSvgCodeChange}
      style={{ width: "100%", height: "300px" }}
      /> */}
      </div>
      <div>
      <button onClick={handleSave}>Save SVG</button>
      <input type="file" onChange={handleFileChange} />
      </div>
      <div>
      <svg
      ref={svgRef}
      dangerouslySetInnerHTML={{ __html: svgCode }}
      width="567"
      height="378"
      />
      <div>
      {Object.keys(textValues).map((id) => (
      <div key={id}>
      <label htmlFor={id}>{id}:</label>
      <input
                   type="text"
                   name={id}
                   value={textValues[id]}
                   onChange={handleTextChange}
                 />
      </div>
      ))}
      </div>
      </div>
      <Link to='/print'>Print</Link>
      </div>
      );
      }
      
      export default SvgEditer; 
