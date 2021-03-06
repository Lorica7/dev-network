const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// GET api/auth
router.get('/', auth, async (req, res) => {
    const user = await User
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//POST api/auth
//authenticate user and get token

router.post('/', [
   
    check('email', ' Please include an email address').isEmail(),
    check('password', 'Must enter password').exists
],
    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {  email, password } = req.body
     
        try {
                
         let user = await User.findOne({ email })
         if (!user) {
             res.status(400).json({errors: [{ message: 'Invalid credentials'}]})
         }
       
        const matches = await bcrypt.compare(password, user.password)
        
            if (!matches) {
                res.status(400).json({errors: [{ message: 'Invalid credentials'}]})
         }
            
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