import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toPng } from 'html-to-image';
import NavBar from '../Components/Navbar'

function SvgEditerr({ svgCode, setSvgCode, textValues, setTextValues, handleAddText, makeTextBold, makeTextRegular, handleAddTitleText,removeText }) {
    const svgRef = useRef(null);

    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [alertTimeout, setAlertTimeout] = useState(null);
    const [size,setSize] = useState(16);

    const handleSave = async () => {
    const svgBlob = new Blob([svgCode], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "100mm x 70mm.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setAlert(true);
    setAlertText("Saved successfully!");
    setAlertType("success");
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
 
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTextValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgCode(event.target.result);
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
    navigate('/edit');
  };

  const handleSavePng = () => {
    const svgElement = svgRef.current;
    if (svgElement) {
      toPng(svgElement)
        .then(dataUrl => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'image.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setAlert(true);
          setAlertText("Saved successfully!");
          setAlertType("success");
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        })
        .catch(error => {
          setAlert(true);
          setAlertText("Failed to Convert!");
          setAlertType("error");
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        });
    }
  };

  const handleRemoveText = (id) => {
    const updatedSvgCode = svgCode.replace(` id="${id}"`, "");
    setSvgCode(updatedSvgCode);
    setTextValues((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[id]; // remove deleted text from state
      return updatedValues;
    });
  };  

  const handlePrint = () => {
    const printContent = document.createElement("div");
    printContent.innerHTML = svgCode;
  
    const printWindow = window.open("", "Print");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const createNew = () =>{
    window.location.reload()
  }
  
  return (
    <div>
      <NavBar />
      <div className="h-[190vh] md:h-[94vh] md:p-5 p-2 bg">
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl text-white font-bold">Edit Label</h1>
            <div className="flex items-center">
              <div className="flex justify-end w-full items-center md:justify-start">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn m-1 text-white">Edit</label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                      <li><button onClick={()=>createNew()}>Create New File</button></li>
                      <li><button onClick={handleAddTitleText} to='/print'>Add Title Text</button></li>
                      <li><button onClick={handleAddText}>Add Normal Text</button></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end w-full items-center md:justify-start">
                      <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn m-1 text-white">Options</label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                          <li><button onClick={handleSave} to='/print'>Save as svg</button></li>
                          <li><button onClick={handleSavePng}>save as PNG</button></li>
                          <li><button onClick={handlePrint}>Print label</button></li>
                          <li>
                          <label class="">
                              <span class="">Select a file &nbsp; &nbsp; &nbsp;</span>
                              <input type="file" accept=".svg" class="hidden" onChange={handleFileChange} />
                          </label>
                          </li>
                          <li><Link to='/'>Go Home</Link></li>
                      </ul>
                    </div>
                  </div>
              </div>
              </div>
              <div className="flex justify-between flex-col md:flex-row md:p-5 border border-white">
                  <div className="md:w-1/2 w-full">
                  <h1 className="text-white font-bold text-xl mb-3">Design View :</h1>
                  <svg
                      ref={svgRef}
                      dangerouslySetInnerHTML={{ __html: svgCode }}
                      className="w-full"
                      width="567"
                      height="378"
                  />
              </div>
              <div className="md:w-1/2 md:ml-4">
                  {Object.keys(textValues).map((id) => (
                      <div key={id} className="my-4">
                      <label htmlFor={id} className="text-white font-semibold text-lg mr-5">{id}:</label>
                      <div className="flex flex-col">
                          <input
                          type="text"
                          className="input input-sm w-full bg-white text-black max-w-xs"
                          name={id}
                          value={textValues[id]}
                          onChange={handleTextChange}
                          />
                          <div>
                            <button className="mr-3 text-blue-700 underline" onClick={()=>makeTextBold(id)}>Bold</button>
                            <button className="mr-3 text-blue-700 underline" onClick={()=>makeTextRegular(id)}>Regular</button>
                            <button className="mr-3 text-blue-700 underline" onClick={()=>removeText(id)}>Remove line</button>
                          </div>
                      </div>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}

export default SvgEditerr;