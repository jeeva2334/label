import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PrintPDFF({svgCode}){
    function generatePDF(svgCode) {
      const pdfDoc = {
        content: [
          {
            svg: svgCode,
            width: 150,
            height: 100
          }
        ],
        pageSize: {
          width: 150,
          height: 100
        }
      };
    
      pdfMake.createPdf(pdfDoc).print();
    }
    
    function handlePrint() {
        const printContent = document.createElement('div');
        printContent.innerHTML = svgCode;
        document.body.appendChild(printContent);
        generatePDF(svgCode);
        document.body.removeChild(printContent);
    }

    return(
        <div>
            <button onClick={handlePrint}>Print</button>
        </div>
    )
}

export default PrintPDFF