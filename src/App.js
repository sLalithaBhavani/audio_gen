// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


function PromptInput() {
  const [prompt, setPrompt] = useState('');

  const handlePlay = () => {
    console.log('Playing with prompt:', prompt);
  };

  const handleDownload = () => {
    // 
    console.log('Downloading prompt:', prompt);
  };
  const handleChange = (event) => {
    setPrompt(event.target.value);
  };
  return (

         <> 
    <div className="name" style={{ fontFamily:'Madimi_One ,cursive', fontSize: '34px' }}><center>GENERATE MUSIC OF YOUR TASTEE!!!</center></div>
    <div className="prompt-container">
      <div className='inputrow'>
      <input 
        type="text"
        value={prompt}
        onChange={handleChange}
        placeholder="Enter your prompt here"
      />
       <button id ="play" onClick={handlePlay}>
        <i className="fas fa-play"></i>Submit     
      </button>
      </div>
      <div>
      <button id ="play" onClick={handlePlay}>
        <i className="fas fa-play"></i>Play     
      </button>
      <button onClick={handleDownload}>
        <i className="fas fa-download"></i> Download
      </button>
      </div>
    </div>

         </>
    
  );
}

export default PromptInput;
