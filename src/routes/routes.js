const { Router } = require('express');
// importando el controlador
const homeController = require('../controllers/homeController');
const imageController = require('../controllers/imageController');

const router = Router();
router.get('/', homeController.index);
router.post('/image', imageController.create);

router.get('/image/:image_id', imageController.index)
router.post('/image/:image_id/likes', imageController.likes)

router.post('/image/:image_id/comment', imageController.comments)

router.delete('/image/:image_id', imageController.remove)



module.exports = router;