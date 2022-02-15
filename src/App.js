import React, { useState, useEffect } from "react";
import "./main.css";
import QRCode from "qrcode";

function App() {
  const [generateDisabled, setGenerate] = useState(true);
  const [download_enabled, setDownload] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [show_image, setImage] = useState(true);

  useEffect(() => {
    const toggleGenerate = () => {
      if (text.length) {
        setGenerate(false);
      } else {
        setGenerate(true);
      }
    };
    toggleGenerate();
  }, [text]);

  const generateQR = async () => {
    const res = await QRCode.toDataURL(text);
    setUrl(res);
    setDownload(true);
    setImage(true);
  };

  return (
    <div className="container">
      <div className="card">
        <input
          onChange={(e) => {
            setText(e.target.value);
            setDownload(false);
            setImage(false);
          }}
          placeholder="Enter your text here"
          type="text"
        ></input>
        <div className="buttons">
          <button
            onClick={() => {
              generateQR();
            }}
            disabled={generateDisabled}
          >
            Generate QR
          </button>
          {download_enabled && (
            <a href={url} download>
              Download
            </a>
          )}
        </div>
        {show_image && (
          <div className="qr-image">
            <img src={url} alt=""></img>
          </div>
        )}
      </div>
      <div className="footer">Powered by OCTOPUS MEDIA</div>
    </div>
  );
}

export default App;
