const { model, Schema } = require('mongoose')
const path = require('path');
const imageSchema  = new Schema({
    title: { type: String },
    fileName: String,
    description: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timeStap:{type:Date,default:Date.now()}
})
imageSchema.virtual('uniqueID')
.get(function(){
    return this.fileName.replace(path.extname(this.fileName),'');
})
module.exports = model('Image',imageSchema);