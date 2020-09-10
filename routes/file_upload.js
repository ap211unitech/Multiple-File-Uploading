const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const schema = require("../config/file_upload");

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([{
    name: "abstract",
    maxCount: 1
},
{
    name: "newfile",
    maxCount: 1
}
]);



// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /doc|jpeg|png|jpg|txt|text/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: jpeg/png and docs Only!');
    }
}





router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {
            if (req.files == undefined) {
                res.json({
                    msg: 'Error: No File Selected!'
                });
            } else {
                let all_files = [];

                for (const key in req.files) {
                    let obj = { [key]: "http://localhost/" + req.files[key][0].path }
                    all_files.push(obj);
                }
                res.json({
                    msg: 'File Uploaded!',
                    all_files
                });
            }
        }
    });
});



module.exports = router;