const axios = require("axios");
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const id = Number(req.body.pokemon);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  axios
    .get(url)
    .then((response) => {
      const pokemon = response.data;
      res.write(`<h1>The name of the pokemon is ${pokemon.name}</h1>`);
      res.write(
        `<h2>The main type of the pokemon: ${pokemon.types[0].type.name}</h2>`
      );
      res.write(`<h3>Weight: ${pokemon.weight}</h3>`);
      res.write(`<h3>Height: ${pokemon.height}</h3>`);
      res.write(`<img src="${pokemonImg}" alt="pokemon" id="pokemon-img">
      `);
      res.send();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
