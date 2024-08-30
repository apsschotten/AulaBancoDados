const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'einszweidrei-shard-00-02.mqo9c.mongodb.net:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('Pokemon');
    collection = db.collection('FstGen');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json());


app.post('/FstGen', async (req, res) => {
  try {
    const novoPokemon = req.body;

    const result = await collection.insertOne(novoPokemon);

    res.status(201).json({ message: 'Pokémon criado com sucesso!', FstGenId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pokémon.', error: err });
  }
});

app.get('/FstGen', async (req, res) => {
  try {

    const pokemons = await collection.find().toArray();
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Pokémons', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/FstGen/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId = new ObjectId(id);

    const pokemon = await collection.findOne({ _id: newId });
    if (!pokemon) {
      res.status(404).json({ message: 'Pokémon não encontrado.' });
    } else {
      res.status(200).json(pokemon);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pokémon', error: err });
  }
});

app.put('/FstGen/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId = new ObjectId(id);
    const atualizacao = req.body;

    const result = await collection.updateOne({ _id: newId }, { $set: atualizacao });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Pokémon não encontrado.' });
    } else {
      res.status(200).json({ message: 'Pokémon atualizado com sucesso!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pokémon', error: err });
  }
});

app.delete('/FstGen/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: newId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Pokémon não encontrado.' });
    } else {
      res.status(200).json({ message: 'Pokémon excluído com sucesso.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir pokémon', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});