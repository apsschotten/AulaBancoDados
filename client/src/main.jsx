import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import CreatePokemon from './CriarMatricula'
import ReadPokemons from './ListarMatricula'
import UpdatePokemon from './AlterarMatricula'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
            <Routes>
                  <Route path="/" element={ <Home/> }/>
                  <Route path="/matricula/cadastrar" element={ <CreatePokemon/> }/>
                  <Route path="/matriculas" element={ <ReadPokemons/> }/>
                  <Route path="/matriculas/alterar" element={ <UpdatePokemon/>}/>
            </Routes> 
      </BrowserRouter>
  </React.StrictMode>,
)



