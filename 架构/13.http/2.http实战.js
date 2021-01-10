const http = require('http')
const server = http.createServer(); 
server.on('request', function (req, res) { 
    res.end('ok2')
    console.log('req');
})

let port =3000;
server.listen(port, function () {
    console.log(`server start ${port}`); 
})
