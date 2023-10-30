import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonCard from './components/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonActions } from './pokemon/index'
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import { pokemonSelectors } from './pokemon/index';

function App() {

  const pokemon = useSelector(pokemonSelectors.getAllPokemon);
  const pokemonDetail = useSelector((state: any) => state.pokemon.pokemonDetail)


  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home pokemon={pokemon} />} />
          <Route path='/pokemon/:id' element={<PokemonDetail item={pokemonDetail} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
