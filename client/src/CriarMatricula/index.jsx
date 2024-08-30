import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreatePokemon() {
  const [numero_pokedex, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [tipagem, setTipagem] = useState('');
  const [tipagemExt, setTipagemExt] = useState('');
  const [descricao, setDescricao] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoPokemon = { numero_pokedex, nome, tipagem, tipagemExt, descricao };

    try {
      const response = await fetch('einszweidrei-shard-00-02.mqo9c.mongodb.net:27017', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPokemon),
      });
      if (response.ok) {
        alert('Pokémon criado com sucesso!');
        setNumero('');
        setNome('');
        setTipagem('');
        setTipagemExt('');
        setDescricao('');
        navigate("/FstGen");
      } else {
        alert('Erro ao criar pokémon.');
      }
    } catch (error) {
      console.error('Erro ao criar pokémon:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Pokémon</h2>
      <input
        type="text"
        placeholder="Número do Pokémon"
        value={numero_pokedex}
        onChange={(e) => setNumero(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Pokémon"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tipagem"
        value={tipagem}
        onChange={(e) => setTipagem(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tipagem Secundária"
        value={tipagemExt}
        onChange={(e) => setTipagemExt(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <button type="submit">Criar!</button>
    </form>
    </div>
  );
}
