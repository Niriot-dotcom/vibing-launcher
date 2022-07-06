import React, { useEffect } from 'react'
import launcherImage from './assets/launcher-imagen.png'
import windowBackground from './assets/launcher-ventana.png'
import bitmonLogo from './assets/logo bitmon.png'

import './App.css'
import { DownloadManager } from './components/DownloadManager/DownloadManager'
const ipcRenderer = window.require('electron').ipcRenderer;

function App() {

    const handleCloseButton = () => {
        ipcRenderer.send('close')
    }
    
    const handleMinButton = () => {
        ipcRenderer.send('minimize')
    }
    
    ipcRenderer.on('update_available', () => {
        const notification = document.getElementById('notification')!;
        const message = document.getElementById('message')!;

        ipcRenderer.removeAllListeners('update_available');
        message.innerText = 'A new update is available. Downloading now...';
        notification.classList.remove('hidden');
    });
    ipcRenderer.on('update_downloaded', () => {
        const notification = document.getElementById('notification')!;
        const message = document.getElementById('message')!;
        const restartButton = document.getElementById('restart-button')!;

        ipcRenderer.removeAllListeners('update_downloaded');
        message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
        restartButton.classList.remove('hidden');
        notification.classList.remove('hidden');
    });
    function closeNotification() {
        const notification = document.getElementById('notification')!;
        notification.classList.add('hidden');
    }
    function restartApp() {
        ipcRenderer.send('restart_app');
    }

    return (
        <div className="App" >
            <div>
                <img
                    draggable="false"
                    className="Bitmon-background"
                    src={windowBackground}
                    alt="main banner"
                ></img>
                <img
                    draggable="false"
                    className="Launcher-image"
                    src={launcherImage}
                    alt='launcher img'
                ></img>
                <img
                    draggable="false"
                    className="Bitmon-logo"
                    src={bitmonLogo}
                    alt='bitmon logo'
                ></img>
                <div className="Draggable-Frame-Area" />
                <button
                    id='close-btn'
                    className="x-btn"
                    onClick={handleCloseButton}
                >
                </button>
                <button
                    id='min-btn'
                    className="min-btn"
                    onClick={handleMinButton}
                > 
                </button>
                <DownloadManager></DownloadManager>
            </div>

            <div id="notification" className="hidden">
                <p id="message"></p>
                <button id="close-button" onClick={closeNotification}>
                    Close
                </button>
                <button id="restart-button" onClick={restartApp} className="hidden">
                    Restart
                </button>
            </div>
        </div>
    )
}

export default App
