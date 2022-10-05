let express = require('express');
let cors = require('cors');
let multer = require('multer');
const fs = require('fs');

let app = express();
app.use(cors());

const campanha = ''

function storage(campanha){
  console.log(campanha)
  const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
      if(!fs.existsSync(`../${campanha} /`)) {
        fs.mkdirSync(`../${campanha} /`)
        cb(null, `../${campanha} /`)
      } else {
        cb(null, `../${campanha} /`)
      }
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({storage})

  return upload.array('file')
}

app.get('/', async (req, res) => {
  res.send({ running: true })
});

app.post('/upload', storage(1), async (req, res) => {
  console.log(req.body.campanha)
  this.campanha = req.body.campanha
  res.send({ upload: true });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Porta: ${port}`);
});