const express = require('express');
const { addArchive, getArchive } = require('../../controller/Archive');

const router = express.Router();

router.route('/').post(addArchive)
router.route('/').get(getArchive)

module.exports = router;