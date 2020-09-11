const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const schema = require("../config/file_upload");
const mongoose = require("mongoose");

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
    name: "manuscript",
    maxCount: 1
},
{
    name: "figurefiles",
    maxCount: 1
},
{
    name: "graphs",
    maxCount: 1
},
{
    name: "coverletters",
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
        cb('Error: Only jpeg/png/jpg images and txt/doc file applicable');
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
                    let obj = { [key]: "http://localhost:8000/" + req.files[key][0].path }
                    all_files.push(obj);
                }
                let all_coauthors = req.body.coauthors.split("\n");
                console.log(JSON.parse(all_coauthors[1]));

                let article = new schema({
                    abstract: all_files[0]["abstract"],
                    manuscript: all_files[1]["manuscript"],
                    figurefiles: all_files[2]["figurefiles"],
                    graphs: all_files[3]["graphs"],
                    coverletters: all_files[4]["coverletters"],
                })
                article.save()
                    .then(() => {
                        res.json({ article });
                    })
                    .catch(err => { res.json({ error: err.message }) })

            }
        }
    });
});



module.exports = router;