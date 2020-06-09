console.log('🖖');
const express = require('express');
const multer = require('multer');
const path = require('path');

// function canvas(req) {
//   return function () {
//     const {
//       memeText,
//       colorValue,
//       fontStyles,
//       fontSize,
//     } = req.body

//     const {
//       filename
//     } = req.file

//     return {
//       canvas: document.querySelector('#main-canvas'),
//       context: canvas.getContext('2d'),
//       canvasImage: new Image(),
//       canvasImage.src: `uploads/${filename}`,
//       loadImage: function (e) {
//         context.drawImage(canvasImage, 0, 0, 550, 350);
//         const displayText = memeText;
//         context.font = `bold ${fontSize} ${fontStyles}, cursive, monospace, sans-serif`;
//         context.fillStyle = `${colorValue}`;
//         context.fillText(displayText, 40, 125);
//       },
//       canvasImage.addEventListener('load', loadImage, false)
//     }
//   }
// }

// multer storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('myImage'); // this is bound to the name attr in the input(type="file")

// check file upload type
function checkFileType(file, cb) {
  // allowed extensions
  const filetypes = /jpeg|jpg|gif|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only'); // this is for the conditional rendering for error
  }
}

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.render('index', {
    // index is referencing index.pug
    title: 'Dank Meme Generator',
    subtitle: 'Meme generator options',
    msg: 'Select an image to upload',
    error: false,
  });
});

app.post('/uploads', (req, res) => {
  // remember when I submit the form the HTTP verb is POST
  upload(req, res, (err) => {
    if (err) {
      res.render('canvas', {
        // was 'index'
        msg: err, // this is where the conditional rendering happens the 'msg' variable in the HTML
      });
    } else {
      // console.log(req.file, req)
      if (req.file === undefined) {
        res.render('index', {
          msg: 'Error: No file selected!', // this is the msg variable being set to something else for conditional rendering
        });
      } else {
        // console.log(req.body)
        // console.log(req.file)
        res.render('canvas', {
          // this used to be 'index' I should create a canvas.pug that will have my canvas
          msg: "💥You've been meme'ed!👊",
          subtitle: 'Meme generator options',
          memeText: req.body.memeText,
          colorValue: req.body.colorValue,
          fontStyles: req.body.fontStyles,
          fontSize: req.body.fontSize,
          file: `uploads/${req.file.filename}`, // this is the path to the file that renders in the image tag in index.pug
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("👂'ing on port 3000...");
});
