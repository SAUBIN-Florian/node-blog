const router = require("express").Router();
const Post = require("../models/Post");

//CREATE
router.post("/", async (req, res) => {

  const newPost = new Post(req.body)
  try{
    const post = await newPost.save();
    res.status(200).json(post);
  }catch(err){
    res.status(500).json(err)
  }
})

// UPDATE
router.put("/:id", async (req, res) => {

  try{
    const post = await Post.findById(req.params.id);
    try{
      if(post.username === req.body.username){
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, {new: true})
        res.status(200).json(updatedPost)
      }else{
        res.status(401).json("Vous ne pouvez modifier que vos Posts")
      }
    } catch(err){
      res.status(500).json(err)
    }
  }catch(err){
    res.status(404).json("Ce Post n'existe pas")
  }
})

// DELETE
router.delete("/:id", async (req, res) => {

  try{
    const post = await Post.findById(req.params.id);
    try{
      if(post.username === req.body.username){
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Votre Post a été détruit avec succès !")
      }else{
        res.status(401).json("Vous ne pouvez détruire que vos Posts")
      }
    } catch(err){
      res.status(500).json(err)
    }
  }catch(err){
    res.status(404).json("Ce Post n'existe pas")
  }
})

// GET ONE
router.get("/:id", async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json({post})
  }catch(err){
    res.status(404).json("Ce Post n'existe pas !")

  }
})

// GET ALL
router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.categories;
  
  try{
    let posts;
    if(username){
      posts = await Post.find({username: username})
    }else if(category){
      posts = await Post.find({categories: {$in: [category]}})
    }else{
      posts = await Post.find()
    }
    res.status(200).json(posts)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;
