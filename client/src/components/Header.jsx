import { Link } from 'react-router-dom';
import '../globals.css';

export default function Header() {
    return (
        <header>
            <img src='client\src\components\images\Logo.png' />
            <div className='bTop'>
                <Link to="/matricula/cadastrar">
                    <button className='bHeader'>Registrar Pokémon</button>
                </Link>
                <Link to="/matriculas">
                    <button className='bHeader'>Pokédex</button>
                </Link>
                <Link to="/matriculas/alterar">
                    <button className='bHeader'>Editar Pokémon</button>
                </Link>
            </div>
        </header>
    );
}
