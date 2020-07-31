// Node Server which will handle Socket IO Connection 
const io = require('socket.io')(8000); // Adding socket io to our js file

const users = {};

// io.on is an socket.io instance(listen to socketIO) 
io.on('connection', socket => {
    // socket.on means if (new-user-joined) this run then run a function named (name) 
    // event name is : new-user-joined 
    //ToDo: If any new User Joins , let other users connected to the server knows! 
    socket.on('new-user-joined', name => {
        // console.log('New user', name);
        users[socket.id] = name; // update users
        socket.broadcast.emit('user-joined', name); // when ever any one join our server it send everyone a response 
    });

    // event name is : send 
    //ToDo:  If someOne send a message BroadCast it to other People
    socket.on('send', message => { // on sending message by anyone, others will able to receive it
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    });

    //ToDo: If someone Leaves The Chat let Others know 
    socket.on('disconnect', message => { // on sending message by anyone, others will able to receive it
        socket.broadcast.emit('leave', users[Socket.id]);
        delete users[socket.id];
    });
});

//ToDo:  When ever the CallBacks runs , it emit the callbacks to (clint.js)