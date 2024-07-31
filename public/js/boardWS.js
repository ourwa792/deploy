const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let ws;
let reconnectInterval = 5000; // 5 ثواني

function connectWebSocket() {
    ws = new WebSocket("ws://localhost:4000");

    ws.onopen = function(event) {
        console.log("Connected to WebSocket server.");
    };

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data);
        if (message.type === 'draw') {
            const data = message.data;
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
        } else if (message.type === 'chat') {
            const chatBox = document.getElementById('chatBox');
            chatBox.value += `${message.username}: ${message.data}\n`;
        }
    };

    ws.onclose = function(event) {
        console.log(`WebSocket connection closed with code: ${event.code} and reason: ${event.reason}`);
        console.log("Attempting to reconnect in 5 seconds...");
        setTimeout(connectWebSocket, reconnectInterval); // إعادة المحاولة بعد 5 ثواني
    };

    ws.onerror = function(event) {
        console.error("WebSocket error observed:", event);
    };
  
    // Ping the server every 25 seconds to keep the connection alive
    setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            console.log('Sending ping to server');
            ws.send(JSON.stringify({ type: 'ping' }));
        }
    }, 25000);
}

connectWebSocket();

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.7;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let paint = false;
const localSettings = {
    lineWidth: 3,
    strokeStyle: 'black'
};

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
    if (ws.readyState === WebSocket.OPEN) {
        const drawData = {
            x: event.offsetX,
            y: event.offsetY,
            painting: painting,
            lineWidth: localSettings.lineWidth,
            strokeStyle: localSettings.strokeStyle
        };
        ws.send(JSON.stringify({ type: 'draw', data: drawData }));
    } else {
        console.log("WebSocket is not open. Ready state is " + ws.readyState);
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
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'chat', data: message }));
        chatInput.value = '';
    } else {
        console.log("WebSocket is not open. Ready state is " + ws.readyState);
    }
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

document.getElementById('sendChat').addEventListener('click', sendChat);
