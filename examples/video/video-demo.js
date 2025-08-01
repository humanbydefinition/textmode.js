/**
 * @name [textmode.js] Video Example
 * @description Real-time video-to-ASCII conversion using textmode.js
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/textmode.js
 */

import { textmode } from '../../dist/textmode.esm.js';

class VideoTextmodeDemo {
    constructor() {
        this.textmodifier = null;
        this.video = null;
        this.isTextmodeVisible = true;
        this.status = document.getElementById('status');
        
        this.init();
    }

    async init() {
        try {
            this.updateStatus('Initializing...');
            this.setupVideoElement();
            await this.setupTextmode();
            this.setupControls();
            this.updateStatus('Ready! Load a video to begin.');
        } catch (error) {
            console.error('Failed to initialize:', error);
            this.updateStatus(`Error: ${error.message}`);
        }
    }

    setupVideoElement() {
        this.video = document.getElementById('myVideo');
        
        this.video.addEventListener('loadedmetadata', () => {
            this.updateStatus(`Video loaded: ${this.video.videoWidth}x${this.video.videoHeight}`);
        });
        
        this.video.addEventListener('play', () => {
            this.updateStatus('Playing - ASCII conversion active');
        });
        
        this.video.addEventListener('pause', () => {
            this.updateStatus('Paused');
        });
        
        this.video.addEventListener('error', (e) => {
            this.updateStatus(`Video error: ${e.target.error?.message || 'Unknown error'}`);
        });
    }

    async setupTextmode() {
        this.textmodifier = await textmode.create(this.video, {
            fontSize: 8,
            renderMode: 'auto',
            frameRate: 30
        });

        // Configure brightness converter for video content
        const converter = this.textmodifier.converter('brightness');
        if (converter) {
            converter.characters(' .:-=+*%@#█');
            converter.characterColor(0, 255, 0, 255);
            converter.characterColorMode('sampled');
            converter.cellColor(0, 0, 0, 0);
            converter.cellColorMode('fixed');
            converter.invert(false);
        }

        this.updateStatus('Textmode initialized');
    }

    setupControls() {
        document.getElementById('playBtn').addEventListener('click', () => {
            this.video?.play().catch(e => this.updateStatus(`Play error: ${e.message}`));
        });

        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.video?.pause();
        });

        document.getElementById('toggleTextmode').addEventListener('click', () => {
            this.toggleTextmodeVisibility();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportCurrentFrame();
        });
    }

    toggleTextmodeVisibility() {
        this.isTextmodeVisible = !this.isTextmodeVisible;

        const btn = document.getElementById('toggleTextmode');
        
        if (this.isTextmodeVisible) {
            this.textmodifier.pipeline.enable();
            btn.textContent = 'Hide Textmode';
            this.updateStatus('Textmode shown');
        } else {
            this.textmodifier.pipeline.disable();
            btn.textContent = 'Show Textmode';
            this.updateStatus('Textmode hidden');
        }
    }

    exportCurrentFrame() {
        if (!this.textmodifier) return;
        
        try {
            const asciiText = this.textmodifier.toString({
                preserveTrailingSpaces: false,
                lineEnding: 'lf'
            });
            
            const blob = new Blob([asciiText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `video-ascii-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.updateStatus('ASCII frame exported');
        } catch (error) {
            this.updateStatus(`Export error: ${error.message}`);
        }
    }

    updateStatus(message) {
        if (this.status) {
            this.status.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        }
        console.log(`[VideoDemo] ${message}`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VideoTextmodeDemo();
});
