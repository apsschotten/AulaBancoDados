import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadPokemons() {
  const [pokemons, setPokemons] = useState([]);


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('einszweidrei-shard-00-02.mqo9c.mongodb.net:27017');
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error('Erro ao buscar os pokémons:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`einszweidrei-shard-00-02.mqo9c.mongodb.net:27017${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setPokemons(FstGen.filter((pokemons) => pokemons._id !== id));
        alert('Pokémon excluído com sucesso!');
      } else {
        alert('Erro ao excluir pokémon.');
      }
    } catch (error) {
      console.error('Erro ao excluir pokémon:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Pokémons</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código do Site</th>
            <th>Número</th>
            <th>Nome</th>
            <th>Tipagem</th>
            <th>Tipagem Secundária</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemons) => (
            <tr key={pokemons._id}>
              <td>{pokemons._id}</td>
              <td>{pokemons.aluno}</td>
              <td>{pokemons.turma}</td>
              <td>{pokemons.curso}</td>
              <td>
                <button onClick={() => handleDelete(pokemons._id)}>Excluir.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
