// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info

/*
  -Stop using boolean loading(we'd always show the last pokemon although current pokemon is error)->status
  -https://kentcdodds.com/blog/stop-using-isloading-booleans
*/
import {PokemonForm, fetchPokemon, PokemonDataView, PokemonInfoFallback} from '../pokemon'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle', pokemon: null, error: null})

  React.useEffect(() => {
    if(!pokemonName) {
      return
    } 
    setState({status: 'pending', pokemon: null})
    fetchPokemon(pokemonName)
      .then(pokemon =>{
        setState({status: 'resolved', pokemon})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  const {status, pokemon, error} = state

  if(status === 'idle') {
    return 'Submit a pokemon'
  } else if(status === 'pending') {
    return <PokemonInfoFallback name={pokemonName}/>
  } else if(status === 'resolved') {
    return  <PokemonDataView pokemon={pokemon}/>
  } else if(status === 'rejected') {
      throw error
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setPokemonName('')} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
