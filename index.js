let express = require('express');
let cors = require('cors');
let multer = require('multer');

let upload = multer({ dest: '../test' });
let app = express();
app.use(cors());

app.get('/', upload.array('file'), async (req, res) => {
  res.send({ running: true });
});

app.post('/upload', upload.array('file'), async (req, res) => {
  res.send({ upload: true, files: req.files });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Porta: ${port}`);
});