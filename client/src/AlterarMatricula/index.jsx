import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateMatricula() {
  const [id, setId] = useState('');
  const [aluno, setAluno] = useState('');
  const [turma, setTurma] = useState('');
  const [curso, setCurso] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { aluno, turma, curso };

    try {
      const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Matrícula atualizada com sucesso!');
        navigate("/matriculas");
      } else {
        alert('Erro ao atualizar matrícula.');
      }
    } catch (error) {
      console.error('Erro ao atualizar matrícula:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Matrícula</h2>
      <input
        type="text"
        placeholder="ID da Matrícula"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Aluno"
        value={aluno}
        onChange={(e) => setAluno(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Turma"
        value={turma}
        onChange={(e) => setTurma(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        required
      />
      <button type="submit">Atualizar Matrícula</button>
    </form>
    </div>
  );
}