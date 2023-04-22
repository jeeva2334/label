import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function MainPage({svgCode, setSvgCode, textValues, setTextValues}) {
    const navigate = useNavigate();
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
    return (
        <div className='h-[100vh]'>
            <div className=' h-20 bg-black'>
                <h1 className='flex justify-start items-center p-5 text-white font-bold text-2xl'>Label Printer</h1>
            </div>
            <div className='h-[80vh] flex flex-col justify-center items-center'>
                <Link className='btn bg-black px-20 py-4' to='/edit'>Create New File</Link>
                <h1 className='mt-8 mb-8 text-white text-lg font-bold'>( or )</h1>
                <label class="btn flex justify-center items-center bg-black px-20 py-4">
                    <span class="ml-4">Select a file &nbsp; &nbsp; &nbsp;</span>
                    <input type="file" class="hidden" onChange={handleFileChange} />
                </label>
            </div>
        </div>
    )
}

export default MainPage