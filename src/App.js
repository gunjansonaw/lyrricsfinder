import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './components/style.css'
const App = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchLyrics = async () => {
    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      setLyrics(response.data.lyrics);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("Oops! Something went wrong while fetching the lyrics. Please try again later.");
      console.error('Error fetching lyrics:', error);
    }
  };

  const handleDownloadPDF = () => {
    const lyricsWindow = window.open('', '_blank');
    lyricsWindow.document.write(`
      <html>
        <head>
          <title>${artist} - ${song} Lyrics</title>
          <style>
            body { font-family: Arial, sans-serif; ${isDarkMode ? 'background-color: #333; color: #fff;' : ''} }
            h1 { color: #007bff; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${artist} - ${song}</h1>
          <pre>${lyrics}</pre>
        </body>
      </html>
    `);
    lyricsWindow.document.close();
    lyricsWindow.print();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container mt-5 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Welcome to Song Lyrics App!</h1>
      <p>Enter the artist and song name to get started.</p>
      <Form>
        <FormGroup>
          <Label for="artist">Artist:</Label>
          <Input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="song">Song:</Label>
          <Input
            type="text"
            id="song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Enter song name"
          />
        </FormGroup>
        <Button color="primary" onClick={fetchLyrics}>
          Show Me the Lyrics!
        </Button>
      </Form>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {lyrics && (
        <div className="mt-4">
          <h2>{`${artist} - ${song}`}</h2>
          <pre>{lyrics}</pre>
          <Button className="mr-2" color="success" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </div>
      )}
      <footer className="mt-5">
        Created with ❤️ by Gunjan in Pune
      </footer>
      <div className="mt-3">
        <Button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </div>
    </div>
  );
};

export default App;
