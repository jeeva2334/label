import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
// import { canvg } from '/node_modules/.vite/deps/canvg.js';

const Print = ({svgCode}) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 567;
      canvas.height = 378;
      const ctx = canvas.getContext('2d');

      const svgString = svgCode.replace(/[\r\n]/g, '').replace(/>\s+</g, '><');
      const v = canvg.fromString(ctx, svgString);
      await v.renderPromise();

      const imgData = canvas.toDataURL('image/png');
      const img = document.createElement('img');
      img.src = imgData;
      document.body.appendChild(img);
    },
  });

  return (
    <div>
      <div className="h-full">
        <div className="flex justify-center mt-10">
          <button onClick={handlePrint} className="btn">
            Print
          </button>
          <Link to="/edit" className="btn ml-5">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Print;
