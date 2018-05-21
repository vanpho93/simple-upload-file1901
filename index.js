const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.static('public'));

const storage = multer.diskStorage({
    filename: (req, file, cb) => cb(null, `${Date.now()}.png`),
    destination: (req, file, cb) => cb(null, './public/images')
});

const upload = multer({ storage }).single('avatar');

app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) return res.send(error);
        res.send(req.file.filename);
    });
});

app.listen(3000, () => console.log('Server started!'));
