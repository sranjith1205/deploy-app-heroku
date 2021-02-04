//Install express server
const express = require('express');
const path = require('path');

const app = express();

// app.use(express.static(__dirname + '/vbimusic'));
app.use(express.static(__dirname + '/dist/vbiMusic'));



// Serve only the static files form the dist directory
// app.use(express.static('./dist/vbimusic'));

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/dist/vbiMusic/index.html'))
    // res.sendFile(path.join(__dirname, 'vbimusic', 'index.html'))
    // res.sendFile('index.html', {root: 'dist/vbimusic/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);