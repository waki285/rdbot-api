const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { verifyKeyMiddleware, InteractionResponseType, InteractionType } = require("discord-interactions");


const calc = (v) => {
  if (v > 45) {
      return eval(`4*${v}-109-(-1)**${v}`);
  } else {
      const p = Math.floor(v / 5) * 8;
      if (v % 5 === 0) return p;
      else return (p + (v % 5)) + ((v % 5 || 5) >= 3 ? 1:0) + ((v % 5 || 5) === 0 ? 2:0);
  }
}

app.all("/interactions", verifyKeyMiddleware(process.env.PUBLIC_KEY), (req, res) => {
  /** @type {import("discord-api-types/v10").APIChatInputApplicationCommandGuildInteraction} */
  const interaction = req.body;
  if (interaction.type === InteractionType.PING) {
    res.send({
      type: InteractionResponseType.PONG
    });
  } else if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === "card") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: calc(interaction.data.options.at(0).value).toString()
        }
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});