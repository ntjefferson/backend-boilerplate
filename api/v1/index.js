const express = require('express');

const handleException = require('../../utils/handleException');
const verifyFirebase = require('../middleware/verifyFirebase');
const userApi = require('./user');

const router = express.Router();

router.get('/:userId/getUser', verifyFirebase, handleException(userApi.getUser));
router.post('/:userId/updateUser', verifyFirebase, handleException(userApi.updateUser));

module.exports = router;
