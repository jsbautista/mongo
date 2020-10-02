const express = require("express");
const router = express.Router();
const content = require("../controllers/content");
const Joi = require("joi");

router.get("/", function (req, res, next) {
  content.getContents((contents) => {
    res.send(contents);
  });
});

router.get("/:ts", function (req, res, next) {
  content.getContent(parseInt(req.params.ts), (content) => {
    if (!content)
      return res
        .status(404)
        .send("The content with the given ts was not found.");
    res.send(content);
  });
});

router.post("/", function (req, res, next) {
  const { error } = validateContent(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const newContent ={
    name: req.body.name,
    message: req.body.message,
    ts: new Date().getTime(),
  };
  content.addContent(newContent);
  res.send(newContent); 
});



router.put("/:ts", (req, res) => {
  const { error } = validateContent(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  const newContent ={
    name: req.body.name,
    message: req.body.message
  };
  content.updateContent(parseInt(req.params.ts), newContent,(content) => {
    if (content.modifiedCount !== 0) res.send({ message: "Content updated" });
      else res.status(404).send({ message: "Content was not found" });
  });


});

router.delete("/:ts", (req, res) => {
  content.deleteContent(parseInt(req.params.ts),(content) => {
    console.log(content);
    if (content.deletedCount === 1) res.status(204).send();
    else res.status(404).send({ message: "Content was not found" });
  });
 
});

const validateContent = (content) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    message: Joi.string().min(5).required(),
  });

  return schema.validate(content);
};

module.exports = router;
