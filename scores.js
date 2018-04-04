const jsonBody = require("body/json");
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    if(req.method === "GET") {
        if(req.url === "/scores") {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            body = JSON.stringify(scores);
        } else {
            res.statusCode = 404;
        }
    } else if(req.method === "POST") {
        res.statusCode = 201;
        jsonBody(req, res, (err, body) => {     
          scores.push(body);
          scores.sort(function(player2, player1) {
                // Descending
                return player1.score - player2.score;
            });
          scores.splice(3);  
         })
    }
 
    res.end(body);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    
});

