let express = require('express');
let cors = require('cors');
let multer = require('multer');
const fs = require('fs');

let app = express();
app.use(cors());

const storage = multer.diskStorage ({
  destination: function(req, file, cb) {
    console.log(this.campanha)
    if(!fs.existsSync(`../images/`)) {
      fs.mkdirSync(`../images/`)
      cb(null, `../images/`)
    } else {
      cb(null, `../images/`)
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage})

app.get('/', async (req, res) => {
  res.send({ running: true })
});

app.post('/upload', upload.array('file'), async (req, res) => {
  res.send({ upload: true });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Porta: ${port}`);
});