const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { addArchive } = require('../../controller/Archive');
const Model = require('../../models/Archive')
require('dotenv').config({ path: __dirname + '../../../config/.env' })

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: "Talk like Jarvis",
    },
    {
      role: "model",
      parts: "Ok sir",
    },
  ],
  generationConfig: {
    maxOutputTokens: 600,
  },
});

const generate = async (prompt) => {
  const result = await chat.sendMessage(prompt).catch(err => { console.log(err) });
  return result;
}

router.route('/').post(async (req, res) => {
  const user = await Model.create({
    role: "user",
    parts: req.body.prompt
  });

  await generate(req.body.prompt).then((text) => {
    Model.create({
      role: "model",
      parts: text?.response.candidates[0].content.parts[0].text
    })
    res.json({
      role: "model",
      parts: text?.response.candidates[0].content.parts[0].text
    });
  });

  // const model = await ;

  // res.json({
  //   role: "model",
  //   parts: text
  // });
})

module.exports = router;