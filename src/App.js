import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = async () => {
    try {
      setMessage('Generating music...');
      const response = await fetch('http://localhost:8000/generate-music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompts: [prompt] }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      setMessage(data.message);

      // Set audio URL if available
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred. Please try again.');
    }
  };

  const handlePlay = () => {
    // if (audioUrl) {
    //   const audio = new Audio(audioUrl);
    //   audio.play();
    // }
  };
  

  const handleDownload = async () => {
    try {
      // Send a GET request to the backend to download the audio file
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error('Failed to download audio file');
      }
  
      // Convert the response to a blob
      const blob = await response.blob();
  
      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'musicgen_out.wav');
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };
  

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="App">
      <h1>Music Generator</h1>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={handleChange}
          placeholder="Enter your prompt here"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>{message}</div>
      {audioUrl && (
        <div>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
}

export default App;
