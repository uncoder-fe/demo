var socket = io('http://localhost:8989');
var Camera = document.querySelector('video');
socket.on('getVideoData', function (data) {
    console.log("来自服务器的视频", data.data);
    var superBuffer = new Blob(data.data, {type: 'video/webm'});
    Camera.src = window.URL.createObjectURL(superBuffer);
    Camera.onloadedmetadata = function(e) {
        Camera.play();
    };
    // download(data.data);
});

function download(recordedBlobs) {
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