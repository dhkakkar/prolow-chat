const multer = require('multer');
const { BadRequestError } = require('../_errorHandler/error');
const randomstring = require('randomstring')
const path = require('path');
const fs = require('fs')
const { failureResponse } = require('./generateResponse');
const fileConfig = require('../config/fileConfig.json');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (file) {
            const fileDir = 'public' + fileConfig[file.fieldname].path
            //create new folder if not present
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }
            callback(null, fileDir);
        } else {
            callback(null, false)
        }

    },
    filename: function (req, file, callback) {
        callback(null, fileConfig[file.fieldname].prefix + Date.now() + '_' + randomstring.generate(15) + path.extname(file.originalname));
    }
});


const maxSize = 1 * 1000 * 1000;

const upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");

const uploadMultipleFiles = (filesArr) => {
    return (req, res, next) => {
        const acceptingFiles = Object.keys(fileConfig)
        let error
        filesArr.forEach(element => {
            if (acceptingFiles.indexOf(element) < 0) {
                error = new BadRequestError(`${element} is not configured  application`)
                return false
            }
        });
        if (error) {
            failureResponse(req, res, error)
        } else {
            let fieldsArr = []
            for (let i = 0; i < filesArr.length; i++) {
                let obj = {
                    name: filesArr[i]
                }
                fieldsArr.push(obj)
            }
            let uploading = upload.fields(fieldsArr)
            uploading(req, res, (err) => {
                if (err) {
                    failureResponse(req, res, err)
                } else {
                    next()
                }
            })
        }


    }
}

const uploadSingleFile = (fileName) => {
    const uploading = upload(fileName)
    console.log('Vikas Image Test', uploading);
    return;
    return (req, res, next) => {
        
        const acceptingFiles = Object.keys(fileConfig)
        
        if (acceptingFiles.indexOf(fileName) < 0) {
            const err = new Error("This file is not configured")
            failureResponse(req, res, err)
            return
        }
        
        uploading(req, res, (err) => {
            if (err) {
                failureResponse(req, res, err)
            } else {
                next()
            }
        })

    }

}


module.exports = { uploadMultipleFiles, uploadSingleFile }