
const { Image } = require('../models');

module.exports = {
    async popular() {
        popularImgages = await Image.findOne().limit(9).sort({ likes: -1 })

        return (popularImgages);
    }
}