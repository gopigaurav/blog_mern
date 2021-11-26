const express = require("express");
const mongoose = require("mongoose");
const PostMessage = require("../models/posts.js");
const router = express.Router();
const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    if (!postMessages)
      return res.status(500).json({ error: "internal server error" });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPostMessage.save();
    res.status(201).json({ message: "saved succesfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  PostMessage.findByIdAndUpdate(
    id,
    { $push: { likes: id } },
    { new: true }
  ).exec(async (err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json("successfully pushed");
    }
  });
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
      const title = new RegExp(searchQuery, "i");

      const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

      res.json({ data: posts });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

module.exports = {
  likePost,
  deletePost,
  updatePost,
  createPost,
  getPost,
  getPosts,
  getPostsBySearch,
};

