import multer from "multer";
import path from "path";

const maxSize = 5242880 // Environ 5 MO

const storageEngine = multer.diskStorage({
    destination: "./public/assets/img", 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`);
    }
})

const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

/**
 * 
 * @param {*} file 
 * @param {*} cb 
 * @returns 
 * Fonction qui retourne et qui va vérifier le type des fichiers autorisés
 */
const checkFileType = (file, cb) => {

    // Autorisation des fichiers img
   
    const fileTypes = /jpg|png|jpeg|gif|webp|svg/

    // Vérification des extensions de fichiers
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if(extName && mimeType){
        return cb(null, true)
    }else {
        cb("Format de fichier non supporté")
    }

}

export default upload