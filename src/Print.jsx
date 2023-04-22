import React,{useRef} from "react";
import { toPng } from 'html-to-image';

function PrintButton({ svgCode }) {
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
  const pngRef = useRef(null);
  return (
    <div className="h-[100vh]">
      <div className='h-20 bg-black'>
        <h1 className='flex justify-start items-center p-5 text-white font-bold text-2xl'>Label Printer</h1>
      </div>
      <div className="flex h-[80vh] justify-center items-center">
        <button className='btn bg-black px-20 py-4' onClick={handlePrint}>Print</button>
      </div>
      <style>
        {`
          @media print {
            @page {
              size: 150mm 100mm;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
          }
        `}
      </style>
      <svg
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgCode }}
        className="hidden"
        width="567"
        height="378"
      />
      <div>
        <img ref={pngRef} />
      </div>
    </div>
  );
}

export default PrintButton;
