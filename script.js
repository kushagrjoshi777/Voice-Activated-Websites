const video = document.getElementById('video');
const statusText = document.getElementById('status');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        statusText.innerText = "Camera started!";
    } catch (error) {
        statusText.innerText = "Camera access denied!";
        console.error("Error accessing camera:", error);
    }
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        statusText.innerText = `Command: ${command}`;
        
        if (command.includes("scroll up")) window.scrollBy(0, -100);
        else if (command.includes("scroll down")) window.scrollBy(0, 100);
        else if (command.includes("open")) {
            let site = command.split("open ")[1].trim().replace(/ /g, "");
            let url = `https://www.${site}.com`;
            window.open(url, "_blank");
        }
    };

    recognition.onerror = (event) => {
        statusText.innerText = "Voice Recognition Error!";
    };
}

startCamera();