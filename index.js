const app = require('express')();
const server = require('http').Server(app);
const port = 3000;
const io = require('socket.io')(server);

server.listen(port, ()=>{
    console.log(`Server is listening at${port}`);
    
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
});

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.emit('message',{manny: 'hey how are you?'});
    socket.on('another event',(data)=>{
        console.log(data);
        
    })    
})
