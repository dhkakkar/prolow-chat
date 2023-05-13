const express = require('express');
const https = require('https')
const app = express()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(urlencodedParser)
app.use(express.static(__dirname + '/public'));
const morgan = require('morgan');
const PORT = process.env.PORT || 2000
const chalk = require('chalk')
const multer = require('multer');
const fs = require('fs');
app.use(morgan(chalk`:method :url {green :status} :response-time ms - :res[content-length]`));

const { logger, loggerFun } = require('./_logHandler');

var timeout = require('connect-timeout'); //express v4

app.use(timeout(80000));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  if (!req.timedout){
      console.log()
  }
  next();
}

app.use(loggerFun);

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

const options = {
    key: fs.readFileSync('./SSL/privkey.pem'),
    cert: fs.readFileSync('./SSL/fullchain.pem')
  };
//socket.io
const server = https.createServer(options, app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log("socket connected");
    socket.on('disconnect', () => {
        logger.info("user disconnected");
    });
    const { saveChatData } = require('./manager/chat.mannager')
    socket.on('send_message', async (data)=> {
        logger.info("Send Message", data);
        console.log("Received Message", data);
        // const dataFinal = await chatMiddleware(data);
        const chat = await saveChatData(data)
        socket.broadcast.to(data.convId).emit("received_message", data);
        // io.to(data.convId).emit("received_message", data);
    })

    socket.on("join", async (data, callback) => {
        try {
            logger.info("Chat Started");
            console.log("Chat Started", data);
            socket.join(data.convId);
            const roomSize = io.sockets.adapter.rooms.get(data.convId).size
            console.log("Room Size", roomSize);
            console.log('callback', callback);
        } catch ( error ) {
            console.log('error', error);
            // return callback(error);
        }
    });
});

//-------------
app.use('/uploads', express.static('uploads'));
app.use('/', require('./routes/index'))

server.listen(PORT, () => {
    console.log(`Application is running at PORT: ${PORT}`)
})