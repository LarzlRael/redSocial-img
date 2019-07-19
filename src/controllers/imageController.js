const imageController = {};
const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fsextra = require('fs-extra');
// importando el moodelo
const { Image, Comment } = require('../models/index');
const md5 = require('md5');


imageController.index = async (req, res) => {
    
    // haciendo las consultas para enviar a la vistas 
    // el $regex es para buscar con una expresion regular, poniendo solo parte de este va a buscar el resto
    const oneImage = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    const comments = await Comment.find({ image_id: oneImage._id });
    
    console.log("cantidad de imagenes : " + comments);

    res.render('image', { oneImage, comments });
}


imageController.create = async (req, res) => {

    const saveImage = async () => {
        const imgURL = randomNumber();
        const imageDuplicate = Image.find({ fileName: imgURL });

        if (imageDuplicate.lenth > 0) {
            saveImage();
        } else {
            const ext = path.extname(req.file.originalname).toLowerCase();
            const image_path = req.file.path;
            const tartGetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
            console.log(tartGetPath);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fsextra.rename(image_path, tartGetPath);

                const newImage = new Image({
                    title: req.body.title,
                    fileName: imgURL + ext,
                    description: req.body.description
                })

                const imageSave = await newImage.save();
                console.log('imagen Guarada');

                res.redirect('/image/' + imgURL);


            } else {
                await fsextra.unlink(image_path);
                res.status(500).json({ error: 'only image are allowed' })
            }
        }



    }


    saveImage();


}
imageController.likes = (req, res) => {
    res.send('create!!!');
}
imageController.comments = async (req, res) => {
    const imageExist = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (imageExist) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = imageExist._id;
        await newComment.save()
        res.redirect('/image/' + imageExist.uniqueID);
    }

}
imageController.remove = (req, res) => {
    res.send('removeee!!!');
}

module.exports = imageController;