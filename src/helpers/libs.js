const helpers = {};

helpers.randomNumber = () => {
    const posible = 'abcdefghijklmnñopqrstuvwxyz0123456';
    let randomNumer = 0;
    for (let i = 1; i < 6; i++) {
        randomNumer += posible.charAt(Math.floor(Math.random() * posible.length));
    }
    return randomNumer;
}

module.exports  = helpers;