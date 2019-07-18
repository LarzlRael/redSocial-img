const imageController = {};
const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fsextra = require('fs-extra');
// importando el moodelo
const { Image } = require('../models/index');
imageController.index = (req, res) => {
    res.render('index');
}
imageController.create = async (req, res) => {


    const imgURL = randomNumber();


    const ext = path.extname(req.file.originalname).toLowerCase();
    const image_path = req.file.path;
    const tartGetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
    console.log(tartGetPath);


    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fsextra.rename(image_path, tartGetPath);

        const newImage = new Image({
            title:req.body.title,
            fileName:req.body.description+ext,
            description:req.body.description
        })

        const imageSave = await newImage.save();
        console.log('imagen guarada :D ');
        res.send('guarada')
        
    } else {
        await fsextra.unlink(image_path);
        res.status(500).json({ error: 'only image are allowed' })
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