const express = require("express");
const router = express.Router();
const Dream = require("../models/Dream");
const verify = require('./verifyToken');

// send the default array of dreams to the webpage
router.get("/", verify, async (request, response) => {
  try{
    const dreams = await Dream.find();
    response.json(dreams);
  } catch(err){
    response.json({message:err});
  }
});

router.post("/", async (request, response) => {
  const dream = new Dream({
    title: request.body.title,
    description: request.body.description,
  });
  try {
    const savedDream = await dream.save();
    response.json(savedDream)
  } catch(err){
    response.json({message: err})
  }
});

router.get('/:dreamId', async (request, response) => {
  try{
  const dream = await Dream.findById(request.params.dreamId);
  response.json(dream)
  }catch(err) {
    response.json({message:err})
  }
});

router.delete('/:dreamId', async (request, response) => {
  try{
    const removedDream = await Dream.remove({_id: request.params.postId});
    response.json(removedDream);
  } catch (err) {
    response.json({message: err})
  }
});

router.patch(':/dreamId', async (request, response) => {
  try{
    const updatedDream = await Dream.updateOne(
      {_id: request.params.dreamId },
      {$set: {title: request.body.title}}
    );
    response.json(updatedDream);
  } catch(err){
    response.json({message: err});
  }
});

module.exports = router;
