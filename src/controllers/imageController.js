const imageController = {};
const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fsextra = require('fs-extra');
// importando el moodelo
const { Image, Comment } = require('../models/index');
const md5 = require('md5');
// importando el modulo del sidebar
const sidebar = require('../helpers/sidebar');

imageController.index = async (req, res) => {
    // haciendo un modelo que contenga los demas modelos
    let viewModel = { image: {}, comments: {} };
    // haciendo las consultas para enviar a la vistas 
    // el $regex es para buscar con una expresion regular, poniendo solo parte de este va a buscar el resto
    const image = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (image) {
        // con este codigo vamos a actualizar automaticamente el modulo de vistas
        image.views = image.views + 1;

        viewModel.image = image;
        // guardado en la base de datos el numero de vistas
        await image.save();
        // guardando los mentarios
        const comments = await Comment.find({ image_id: image._id });
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel);

        console.log('EStas son todas la vistas de que se mandan : ' + viewModel);

    } else {
        res.redirect('/');
    }
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
imageController.likes = async (req, res) => {
    const ImageExist = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (ImageExist) {
        ImageExist.likes = await ImageExist.likes + 1;
        await ImageExist.save();
        res.json({
            likes: ImageExist.likes
        })
    } else {
        res.status(500).json({ error: 'internal error :| ' });
    }

}
imageController.comments = async (req, res) => {
    const imageExist = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (imageExist) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = imageExist._id;
        await newComment.save()
        res.redirect('/image/' + imageExist.uniqueID);
    } else {
        res.redirect('/');
    }

}
imageController.remove = async (req, res) => {
    const { image_id } = req.params;
    const imageDelete = await Image.findOne({ fileName: { $regex: image_id } });
    console.log(imageDelete);
    console.log('nombde de la imagen : ' + imageDelete.fileName);

    if (imageDelete) {
        await fsextra.unlink(path.resolve('./src/public/upload/' + imageDelete.fileName));
        await Comment.deleteOne({ image_id: imageDelete._id });
        await imageDelete.remove();
        res.json({ eliminad: 'true' })
    }


}

module.exports = imageController;