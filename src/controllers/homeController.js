const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const homeCtrl = {};

homeCtrl.index = async (req, res) => {


    const images = await Image.find().sort({ timestamp: -1 });
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    
    console.log(viewModel);
    
    res.render('index', viewModel);

}
module.exports = homeCtrl;