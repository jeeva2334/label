import React, { useState, useRef } from "react";
import PrintButton from "./Print";
import { Link } from "react-router-dom";
import { toPng } from 'html-to-image';

function SvgEditer({svgCode,setSvgCode,textValues,setTextValues}) {

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertTimeout, setAlertTimeout] = useState(null);

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
      
  const svgRef = useRef(null);
  return (
    <div className="h-[190vh] md:h-[120vh]">
      <div className='h-20 bg-black'>
        <h1 className='flex justify-start items-center p-5 text-white font-bold text-2xl'>Label Printer</h1>
      </div>
      <div>
        <h1 className="text-xl text-center mt-4 text-white font-bold">Edit</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center ml-0 md:ml-9">
        <div className="md:w-1/2">
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
              <input
                type="text"
                className="input input-sm w-full max-w-xs"
                name={id}
                value={textValues[id]}
                onChange={handleTextChange}
              />
            </div>
          ))}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">Options</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button onClick={handleSave} to='/print'>Save as svg</button></li>
              <li><button onClick={handleSavePng}>save as PNG</button></li>
              <li><button onClick={handlePrint}>Print label</button></li>
              <li>
                <label class="">
                  <span class="">Select a file &nbsp; &nbsp; &nbsp;</span>
                  <input type="file" class="hidden" onChange={handleFileChange} />
                </label>
              </li>
              <li><Link to='/'>Go Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
      {alert && <div className=" flex justify-center items-center">
        <div className={`alert alert-${alertType} w-[700px] shadow-lg absolute bottom-10`}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{alertText}!</span>
          </div>
        </div>
      </div>}
    </div>
  );    
} 
export default SvgEditer; 
