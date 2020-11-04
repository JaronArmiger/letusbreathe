const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.album_list);
router.get('/names', albumController.album_names);
router.get('/:id', albumController.album_get);
router.post('/', albumController.album_create);
router.delete('/:id', albumController.album_delete);

module.exports = router;