var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

//웹서버 생성
var server = http.createServer(function(request, response){
  //htmlPage.html 파일을 읽습니다.
  fs.readFile('htmlPage.html', function(error, data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
}).listen(52273, function(){
  console.log('Server running at http://127.0.0.1:52273');
});

// 소켓 서버를 생성 및 실행
var id = 0;
var io = socketio.listen(server);

// 통신을 해보자!!
io.sockets.on('connection', function(socket){
  id = socket.id;
  //rint 이벤트
  socket.on('rint', function(data){
    console.log('Client Send Data:', data);
    // 1.클라이언트에 smart이벤트 발생
    // socket.emit('smart', data);
    // 2.public : 나를 포함한 전부에게 전달
    // io.sockets.emit('smart', data);
    // 3.broadcast : 나 빼고 전부
    // socket.broadcast.emit('smart', data);
    // 4.private : 1 vs 1
    io.sockets.to(id).emit('smart', data);
  });
});
