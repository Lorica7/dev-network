const express = require('express');
const auth = require('../../middleware/auth')
const router = express.Router()
const Profile = require ('../../models/Profile')
const User = require('../../models/User')

// GET api/profile/self
// get current user profile
router.get('/self', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', avatar])
        if (!profile) {
            return res.status(400).json({msg: "There is no profile for this user"})
        }
        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server errorß')
    }
})




module.exports = router;