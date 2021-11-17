import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/dali.jpg", matched: false },
  { "src": "/img/oKeefe.jpg", matched: false }, 
  { "src": "/img/bosch.jpg", matched: false },
  { "src": "/img/goya.jpg", matched: false },
  { "src": "/img/picasso.jpg", matched: false },
  { "src": "/img/monet.jpg", matched: false }

]

function App() {
const [cards, setCards] = useState([])
const [turns, setTurns] = useState(0)
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)



// 


// shuffle

const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id: Math.random()}))


  setChoiceOne(null)
  setChoiceTwo(null)   
  setCards(shuffledCards)
  setTurns(0)

}

// handle choice

const handleChoice = (card) => {
  choiceOne ? setChoiceTwo (card) : setChoiceOne(card)
  
}

// compare 2 cards

useEffect(() => {
 
  if(choiceOne && choiceTwo) {
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })

      })
      resetTurn()
    } else {
      setTimeout(() =>
     
      resetTurn(), 800)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)


// reset choices / increase turn

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

// start a new game

useEffect(() => {
  shuffleCards()
},[])

  return (
    <div className="App">
    <h1>Memory Match</h1> 
    <hr/>
    <h2>Famous Paintings</h2>
    <button onClick={shuffleCards}>Start</button> 

    <div className="card-grid">
      {cards.map(card => (
        <SingleCard
         key={card.id}
         card={card}
         handleChoice={handleChoice}
         flipped={card === choiceOne || card === choiceTwo || card.matched}
         disabled={disabled}
         />
       

      ))}
    </div>
      <p>Turns: {turns}</p>
      </div>
  );
}
export default App;
