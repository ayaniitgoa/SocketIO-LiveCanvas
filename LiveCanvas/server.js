const express = require('express');
const socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 5000;
app.set('view engline', 'html');

app.use(express.static('public'));

const files = `${__dirname}\\public`;

app.get('/draw', (req, res) => {
  res.sendFile('draw.html', { root: files });
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(`New connection: ${socket.id}`);

  socket.on('mouse', mouseMessage);

  function mouseMessage(data) {
    socket.broadcast.emit('mouse', data);
    // console.log(data);
  }
}
