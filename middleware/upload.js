const multer = require('multer');
const moment = require('moment');
const {diskStorage} = require('multer');

//Базовая конфигурация для загрузки файлов

//Конфигураия для загрузки и хранения файлов
const storage = multer(diskStorage({
    destination(req, file, cb) {
        cb(null,'uploads/')
    },
    filename(req, file, cb) {
        //DDMMYYYY-HHmmss_SSS - см. документацию momentjs
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
}));

//Фильтрация файлов - загружаем только картинки
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb (null, true);
    } else {
        cb (null, false);
    }
}

//Ограничение размера загружаемого файла
const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    // storage: storage,
    // fileFilter: fileFilter,
    // limits: limits
    storage,
    fileFilter,
    limits
})