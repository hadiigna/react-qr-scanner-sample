import './App.css';
import QrScanner from 'qr-scanner';
import {useState, useRef, useCallback } from 'react';

function QrCodeCamera() {

  const scannerInstance = useRef();

  const [result, setResult] = useState('Scanning...');

  const videoElemRef = useCallback(async node => {
    if(node) {
      scannerInstance.current = new QrScanner(node, 
        scanResult => setResult(scanResult.data), {
        onDecodeError: error => {
          if (error === QrScanner.NO_QR_CODE_FOUND) {
            setResult("Scanning...");
          }
          else {
            setResult(`ERROR: ${error}`);
          }
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      QrScanner.listCameras(true);
      await scannerInstance.current.setCamera('user');
      await scannerInstance.current.start();
      console.log("camera started");
    }
  }, []);

  return (
    <div>
      <h1> {result} </h1>
      <video ref={videoElemRef}></video>
    </div>
  );
}

function App() {
  return (
    <div className="App">
        <QrCodeCamera></QrCodeCamera>
    </div>
  );
}

export default App;
