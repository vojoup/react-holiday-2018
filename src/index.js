import React from 'react';
import ReactDOM from 'react-dom';
import { createResource, createCache } from 'react-cache';

import './styles.css';

let cache = createCache();
let pokemonCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json())
);

function PokemonListItem({ className, component: Component = 'li', ...props }) {
  return (
    <Component
      className={['pokemon-list-item', className].join(' ')}
      {...props}
    />
  );
}

function PokemonList() {
  return (
    <ul>
      {pokemonCollectionResource.read(cache).results.map(pokemon => (
        <PokemonListItem key={pokemon.name}>{pokemon.name}</PokemonListItem>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <React.Suspense fallback={<div>loading...</div>}>
        <PokemonList />
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
