const { Comment, Image } = require('../models');

module.exports = {

    async newest() {
        const comments = await Comment.findOne()
                        .limit(5)
                        .sort({ timeStamp: -1 })

        for (const comment in comments) {
            const image = Image.findOne({ _id: comment.image_id });
            comment.image = image;
        }

        return comments;
    }
}