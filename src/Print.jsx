import React from "react";

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
  
  return (
    <div>
      <button onClick={handlePrint}>Print</button>
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
    </div>
  );
}

export default PrintButton;
