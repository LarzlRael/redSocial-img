const homeCtrl = {};
const { Image } = require('../models/index');
const sidebar = require('../helpers/sidebar');
homeCtrl.index = async (req, res) => {
    const allImages = await Image.find().sort({ timeStamp: -1 });
    let viewModel = { allImages: [] };
    viewModel.allImages = allImages;
    viewModel = await sidebar(viewModel);
    console.log(viewModel);

    res.render('index', {
        viewModel
    })
}

module.exports = homeCtrl;