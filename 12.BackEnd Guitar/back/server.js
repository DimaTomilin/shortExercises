const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { Guitar, ElectricGuitar, BassGuitar } = require('./classes');

const port = 8080;

app.listen(port, function () {
  console.log('app started');
});

app.use(express.json());

app.put('/create/:type', (req, res) => {
  const type = req.params.type;
  const { year, brand, price, strings, id } = req.body;
  const guitar = new Guitar(year, brand, price, strings, id);
  fs.writeFileSync(
    path.join('./back/guitars', type, `${id}.json`),
    JSON.stringify(guitar)
  );
  res.json(guitar);
  res.end();
});

app.delete('/delete/:type/:id', (req, res) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    fs.rmSync(path.join('./guitars', type, `${id}.json`));
    res.send('Guitar was deleted sucsesful');
    res.end();
  } catch {
    res.json(err);
    res.end();
  }
});

function creatyGuitarObject(type, id) {
  let guitar;
  switch (type) {
    case 'bass':
      const { _year, _brand, _price, _id } = JSON.parse(
        fs.readdirSync(`./guitars/${type}/${id}.json`)
      );
      guitar = new BassGuitar(_year, _brand, _price, _id);
      break;
    case 'electro':
      const { _year, _brand, _price, _strings, _longNeck, _id } = JSON.parse(
        fs.readdirSync(`./guitars/${type}/${id}.json`)
      );
      guitar = new ElectricGuitar(
        _year,
        _brand,
        _price,
        _strings,
        _longNeck,
        _id
      );
      break;
    case 'classic':
      const { _year, _brand, _price, _strings, _id } = JSON.parse(
        fs.readdirSync(`./guitars/${type}/${id}.json`)
      );
      guitar = new BassGuitar(_year, _brand, _price, _strings, _id);
      break;
  }
  return guitar;
}

app.get('/play/:type/:id', (req, res) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const guitar = creatyGuitarObject(type, id);
    const sound = guitar.play();

    res.send(sound);
    res.end();
  } catch {
    res.json(err);
    res.end();
  }
});

app.get('/playSolo/:id', (req, res) => {
  try {
    const id = req.params.id;
    const { _year, _brand, _price, _id } = JSON.parse(
      fs.readdirSync(`./guitars/bass/${id}.json`)
    );
    const guitar = new BassGuitar(_year, _brand, _price, _id);
    const sound = guitar.playSolo();

    res.send(sound);
    res.end();
  } catch {
    res.json(err);
    res.end();
  }
});
