const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    const user = await newUser.save();
    res.status(200).json(`${user.username} a été ajouté !`);
  }catch(err){
    res.status(500).json(err);
  }
})

//LOGIN
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username})
    !user && res.status(400).json("Informations erronées")

    const validate = await bcrypt.compare(req.body.password, user.password)
    !validate && res.status(400).json("Informations erronées")

    // destructuration pour envoyer seulement ce qui est voulu avec 'others'
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;