
const { Image } = require('../models');

module.exports = {
    async popular() {
        popularImgages = await Image.find().limit(9).sort({ likes: -1 })

        return (this.popular);
    }
}