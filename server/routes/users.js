const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json("Vos informations ont été modifiées");
    }catch(err) {
      res.status(500).json(err);
    }
  }else {
    res.status(401).json("Vous ne pouvez modifier que votre propre compte...")
  }
  })

//DELETE

router.delete("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    try{
      const user = await User.findById(req.params.id);
      try{
        await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("Votre compte à été supprimée !");
      }catch(err) {
        res.status(500).json(err);
      }
    }catch(err){
      res.status(404).json("Ce compte n'existe pas...")
    }
  
  }else {
    res.status(401).json("Vous ne pouvez détruire que votre propre compte...")
  }
})

//GET ONE
router.get("/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc;
    res.status(200).json(others)
  }catch(err){
    res.status(500).json("Cet utilisateur n'existe pas...")
  }
})

module.exports = router;