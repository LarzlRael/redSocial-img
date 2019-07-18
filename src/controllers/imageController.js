const imageController = {};
const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fsextra = require('fs-extra');
imageController.index = (req, res) => {
    res.render('index');
}
imageController.create = async (req, res) => {

    const imgURL = randomNumber();
    console.log(imgURL);

    const ext = path.extname(req.file.originalname).toLowerCase();
    const image_path = req.file.path;
    const tartGetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
    console.log(tartGetPath);

    res.send('subido :D')
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fsextra.rename(image_path, tartGetPath);
    }

}
imageController.likes = (req, res) => {
    res.send('create!!!');
}
imageController.coment = (req, res) => {
    res.send('commnet!!!');
}
imageController.remove = (req, res) => {
    res.send('removeee!!!');
}

module.exports = imageController;