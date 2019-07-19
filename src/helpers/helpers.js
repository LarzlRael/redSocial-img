const helpers = {}
const moment = require('moment');

helpers.timeAgo = timestamp =>{
    return moment(timestamp).startOf('minutes').fromNow();
}


module.exports = helpers;