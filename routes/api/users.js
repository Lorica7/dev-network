const express = require('express');

const router = express.Router()


// GET api/users
router.get('/', (req, res) => res.send('Users Route'))

module.exports = router;