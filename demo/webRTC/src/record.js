window.stream = null;
var socket = io('http://localhost:8989');
var mediaRecorder = null;
var recordedBlobs = [];
var closeTimer = null;
var Camera = document.querySelector('video');
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var config = {
    audio: true,
    video: {
        width: { min: 1280 },
        height: { min: 720 },
        frameRate: { ideal: 10, max: 15 } 
    }
};

navigator.getUserMedia(config, successCallback, errorCallback);

function successCallback(stream) {
    console.log("试试", stream);
    window.stream = stream;
    Camera.src = window.URL.createObjectURL(stream);
    setInterval(function () {
        closeTimer = null;
        startRecording();
    }, 12 * 1000)
}
function errorCallback() {
    console.log("error")
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {
    var options = { mimeType: 'video/webm', bitsPerSecond: 100000 };
    recordedBlobs = [];
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e0) {
        console.log('Unable to create MediaRecorder with options Object: ', e0);
    }
    mediaRecorder.ondataavailable = function (event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    };
    mediaRecorder.start(10); // collect 10ms of data
    closeTimer = null;
    closeTimer = setTimeout(function () {
        stopRecording();
    }, 10 * 1000)
}

function stopRecording() {
    mediaRecorder.stop();
    socket.emit('sendVideoData', { video: recordedBlobs });
    console.log('Recorded Blobs: ', recordedBlobs);
    //socket.emit('sendVideoData', { video: recordedBlobs });
    //download();
}
function download() {
    var blob = new Blob(recordedBlobs, { type: 'video/webm' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}