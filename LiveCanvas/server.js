const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('draw.ejs');
});

app.post('/', (req, res) => {
  const roomNo = req.body.room;
  res.redirect(`/draw?room=${roomNo}`);
  // res.redirect(`/canvaslive?room=${roomNo}`);
});

app.get('/draw?:room', (req, res) => {
  const room = req.query.room;

  res.render('roomMsg.ejs', { room });
});

app.get('/canvaslive?:room', (req, res) => {
  res.render('canvaslive.ejs');
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
