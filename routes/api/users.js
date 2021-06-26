const express = require('express');
const {check, validationResult} = require('express-validator')
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();
const connectDB = require('../../config/db');

// GET api/users
//register new user
router.post('/', [
    check('name', 'Must include name').not().isEmpty(),
    check('email', ' Please include an email address').isEmail(),
    check('password', 'Enter a valid password. Must include at least 6 characters').isLength({min: 6})
],
    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body
     
        try {
                //   Check if user already exists
         let user = await User.findOne({ email })
         if (user) {
             res.status(400).json({errors: [{ message: 'User already exists'}]})
         }
         //get users gravatar
         const avatar = gravatar.url(email, {
             s: '200',
             r: 'pg',
             d: 'mm'
         })
         
         user = new User({
             name,
             email,
             avatar,
             password
         })
         //encrypt password
         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);
   
         await user.save();
   
         const payload = {
           user: {
             id: user.id
           }
         };

       //  return json webtoken
            jwt.sign(payload, process.env.jwtSecret,
                (err, token) => {
                    if (err) throw err;
                    res.json({token})
            }
            )

    } catch (err) {
         console.error(err.message)
         res.status(500).send('server error')
     }

    
})

module.exports = router;

