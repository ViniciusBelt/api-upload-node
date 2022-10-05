let express = require('express');
let cors = require('cors');
let multer = require('multer');

let app = express();
app.use(cors());

const storage = multer.diskStorage ({
  destination: function(req, file, cb) {
    cb(null, "../test/")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage})

app.get('/', upload.array('file'), async (req, res) => {
  res.send({ running: true });
});

app.post('/upload', upload.array('file'), async (req, res) => {
  res.send({ upload: true });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Porta: ${port}`);
});