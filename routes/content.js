const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const Joi = require("joi");




router.get("/", function (req, res, next) {
  console.log("Aca");
  Content.findAll().then((result) => {
    res.send(result);
  });
});


router.post("/", function (req, res, next) {
  const { error } = validateContent(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  Content.create({ name: req.body.name, message: req.body.message, ts: new Date().getTime(),}).then(
    (response) => {
    console.log(response);
    res.send(response);
  });
});


router.get("/:ts", function (req, res, next) {
  Content.findAll({
    where: {
      ts: req.params.ts
    }
  }).then((result) => {
    console.log(result);
    if (result.length ===0 )
    return res
      .status(404)
      .send("The content with the given ts was not found.");
  
    console.log(result);
    res.send(result);
  });
});

router.put("/:ts", (req, res) => {
  const { error } = validateContent(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Content.update(req.body, { where: { ts: req.params.ts } }).then(
    (response) => {
      if (response[0] !== 0) res.send({ message: "Content updated" });
      else res.status(404).send({ message: "Content was not found" });
    }
  );
});

router.delete("/:ts", (req, res) => {
  Content.destroy({
    where: {
      ts: req.params.ts,
    },
  }).then((response) => {
    if (response === 1) res.status(204).send();
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
 