const express = require('express');
const {check, validationResult} = require('express-validator')
const router = express.Router();
const User = require('../../models/User')


// GET api/users
//register new user
router.post('/', [
    check('name', 'Must include name').not().isEmpty(),
    check('email', ' Please include an email address').isEmail(),
    check('password', 'Enter a valid password. Must include at least 6 characters').isLength({min: 6})
],
    
 async   (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
     const { name, email, password } = req.body
     
     try {
         //Check if user already exists
         let user = await user.findOne({ email })
         if (user) {
             res.status(400).json({errors: [{ message: 'User already exists'}]})
         }
         //get users gravatar

         //encrypt password

         //return json webtoken

         res.send('Users Route')
     }
     catch (err) {
         console.error(err.message)
         res.status(500).send('server error')
     }

    
})

module.exports = router;