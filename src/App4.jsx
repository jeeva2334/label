import React from "react";
import qz from "qz-tray";

function PrintButton({ svgCode }) {
  const handlePrint = async () => {
    try {
      await qz.websocket.connect();
      await qz.printers.getDefault();
      await qz.print({
        printer: "My Printer Name",
        data: [svgCode],
        type: "raw",
        options: {
          size: { width: "150mm", height: "100mm" },
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      qz.websocket.disconnect();
    }
  };

  return <button onClick={handlePrint}>Print</button>;
}

export default PrintButton;
