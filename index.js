let express = require('express');
let cors = require('cors');
let multer = require('multer');
const fs = require('fs');

let app = express();
app.use(cors());

let campanha = 'images'

let storage = multer.diskStorage ({
  destination: function(req, file, cb) {
    if(!fs.existsSync(`../${campanha}/`)) {
      fs.mkdirSync(`../${campanha}/`)
      cb(null, `../${campanha}/`)
    } else {
      cb(null, `../${campanha}/`)
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({storage})

app.get('/', async (req, res) => {
  res.send({ running: true })
});

app.get('/campanha', async (req, res) => {
  console.log(`Campanha selecionada: ${req.query.campanha}`);
  campanha = campanha != req.query.campanha ? req.query.campanha : campanha
  res.send({ campanha: campanha })
});

app.post('/upload', upload.array('file'), async (req, res) => {
  campanha = 'images'
  res.send({ upload: true });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Porta: ${port}`);
});