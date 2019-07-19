const homeCtrl = {};
const { Image } = require('../models/index');
homeCtrl.index = async (req, res) => {
    const allImages = await Image.find().sort({ timeStamp: -1 });
    res.render('index', {
        allImages
    })
}

module.exports = homeCtrl;