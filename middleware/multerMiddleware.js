const multer = require('multer')

//2) create a storage space in server

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads') // where the file sholud be stored
    },
    filename:(req,file,callback)=>{
        //Date.now() - returns milliseconds from the date class
        const filename = `image-${Date.now()}-${file.originalname}` // filename 
        
        callback(null,filename)
    }
})
//3) to set which type of file must be allowed to upload
//filefilters - control which files should be uploaded 
// callback false - files will be rejected / true- files will be accepted

//provide file filter

const fileFilter = (req,file, callback)=>{
    if(file.mimetype == 'image/png'|| file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null, false)
        return callback(new Error ('Only png, jpg, jpeg files are accepted'))
    }
}

//call multer
const multerConfig = multer({

    storage,
    fileFilter
})

module.exports = multerConfig