// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'

/*
  -Lift state:
  -Colocate state: used by only this component(Name component with name state)
  -Should use CSS in JS(colocation)
  -Reference: https://kentcdodds.com/static/d2b50fdb8371e7ec209faacac5363111/9b1e2/where-to-put-state.png
*/
function Name() {
  const [name, setName] = React.useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.target.value)}
      />
    </div>
  )
}

function Display({animal}) {
  return <div>{`your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal}/>
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal}/>
    </form>
  )
}

export default App
