const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let socket;
if(window.location.hostname === 'deploy-kewv.onrender.com') {
    socket = io('https://deploy-kewv.onrender.com', { transports: ['websocket', 'polling'] });
} else {
    socket = io('http://localhost:3000', { transports: ['websocket', 'polling'] })
}



socket.on("connect_error", (err) => {
    // the reason of the error, for example "xhr poll error"
    console.log("--err.message--"+err.message);
    
    // some additional description, for example the status code of the initial HTTP response
    console.log("--err.description--"+err.description);
    
    // some additional context, for example the XMLHttpRequest object
    console.log("---err.context---"+err.context);
});

socket.on("connect", () => {
    console.log("Connected to Socket.IO server.");
    hideError();
});

socket.on("draw", (message) => {
    const data = message.data;
    console.log(JSON.stringify(data, null, 2))
    ctx.save();
    ctx.lineWidth = data.lineWidth;
    ctx.strokeStyle = data.strokeStyle;
    if (data.painting) {
        ctx.lineCap = 'round';
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    } else {
        ctx.beginPath();
    }
    ctx.restore();
});

socket.on("chat", (message) => {
  
    addMessageToChat(message.username, message.data);

});

socket.on("error", (message)=> {
    console.error(`Error: ${message.message}`);
    showError(`Error: ${message.message}`);
    socket.disconnect()
})

socket.on("disconnect", (reason, details) => {
    console.log(`Socket.IO connection closed: ${reason}`);
    console.log("Attempting to reconnect...");
    // the low-level reason of the disconnection, for example "xhr post error"
    console.log("details.message"+details.message);

    // some additional description, for example the status code of the HTTP response
    console.log("details.message"+details.description);

    // some additional context, for example the XMLHttpRequest object
    console.log("details.message"+details.context);
    
    showError("تم قطع اتصالك بسبب اساءة الاستخدام...جاري اعادة المحاولة")
    setTimeout(() => {
        socket.connect();
    }, 5000);
});



let paint = false;
const localSettings = {
    lineWidth: 3,
    strokeStyle: 'black'
};

let canvasImage = null;

function resizeCanvas() {
    if (canvasImage) {
        const img = new Image();
        img.src = canvasImage;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.7;
}

function saveCanvas() {
    canvasImage = canvas.toDataURL();
}

window.addEventListener('resize', () => {
    saveCanvas();
    resizeCanvas();
});
resizeCanvas();


function startDraw(event) {
    paint = true;
    draw(event);
}

function endDraw(event) {
    if (!paint) return;
    paint = false;
    sendDrawData(event, false);
    ctx.beginPath();
}

function draw(event) {
    if (!paint) return;
    ctx.lineCap = 'round';
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);

    sendDrawData(event, true);
}

function sendDrawData(event, painting) {
    if (socket.connected) {
        const drawData = {
            x: event.offsetX,
            y: event.offsetY,
            painting: painting,
            lineWidth: localSettings.lineWidth,
            strokeStyle: localSettings.strokeStyle
        };
        socket.emit('draw', { type: 'draw', data: drawData });
    } else {
        console.log("Socket.IO is not connected.");
    }
}

function changeWidth(event) {
    localSettings.lineWidth = event.target.value;
    ctx.lineWidth = localSettings.lineWidth;
}

function changeColor(event) {
    localSettings.strokeStyle = event.target.getAttribute('data-color');
    ctx.strokeStyle = localSettings.strokeStyle;
}

function sendChat() {
    const chatInput = document.getElementById('messageInput');
    const message = chatInput.value;
    if (socket.connected) {
        socket.emit('chat', { type: 'chat', data: message });
        chatInput.value = '';
    } else {
        console.log("Socket.IO is not connected.");
    }
}


function addMessageToChat(username, message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('d-flex', 'align-items-center', 'text-right', 'justify-content-start');
    messageDiv.innerHTML = `
        <div class="pr-2"> <span class="name">${username}</span>
            <p class="msg">${message}</p>
        </div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}



canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endDraw);

document.getElementById('slider').addEventListener('input', changeWidth);
document.getElementById('red').addEventListener('click', changeColor);
document.getElementById('green').addEventListener('click', changeColor);
document.getElementById('blue').addEventListener('click', changeColor);
document.getElementById('eraser').addEventListener('click', changeColor);

document.getElementById('sendMessage').addEventListener('click', sendChat);


function showError(message) {
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}


function hideError() {
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.style.display = 'none';
}