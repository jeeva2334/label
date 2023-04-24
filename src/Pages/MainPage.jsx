import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Components/Navbar'

function MainPage({svgCode, setSvgCode, textValues, setTextValues}) {
    const navigate = useNavigate();
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const svgString = event.target.result;
        setSvgCode(svgString);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const textElements = svgDoc.getElementsByTagName("text");
        const newValues = {};
        for (let i = 0; i < textElements.length; i++) {
          const textElement = textElements[i];
          const id = textElement.getAttribute("id");
          const value = textElement.textContent.trim();
          newValues[id] = value;
        }
        setTextValues((prevValues) => ({
          ...prevValues,
          ...newValues,
        }));
      };
        reader.readAsText(file);
        navigate('/edit');
    };
    return (
        <div className='h-[100vh] bg text-white'>
            <NavBar />
            <div className='h-[80vh] flex flex-col justify-center items-center'>
                <Link className='btn bg-black px-20 py-4' to='/edit'>Create New File</Link>
                <h1 className='mt-8 mb-8 text-lg font-bold'>( or )</h1>
                <label class="btn flex justify-center items-center bg-black px-20 py-4">
                    <span class="ml-4">Select a file &nbsp; &nbsp; &nbsp;</span>
                    <input type="file" accept=".svg" class="hidden" onChange={handleFileChange} />
                </label>
            </div>
        </div>
    )
}

export default MainPage