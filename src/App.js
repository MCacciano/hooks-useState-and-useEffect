import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [allPokemonCards, setAllPokemonCards] = useState([]);
  const [page, setPage] = useState(1);

  // useEffect with an async call
  useEffect(() => {
    const asyncGetPokemon = async () => {
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v1/cards?pageSize=20&page=${page}`
        );
        const data = await response.json();

        setAllPokemonCards(data.cards);
        setPage(prev => prev + 1);
      } catch (err) {
        console.error(err);
        return () => null;
      }
    };

    asyncGetPokemon();

    return () => null;
    // if dependency array is empty useEffect will only run on mount
  }, []);

  // show how the dependency array works
  useEffect(() => {
    if (allPokemonCards.length > 20) {
      console.log('more than 20 cards');
    }
  }, [allPokemonCards]);

  // getting more cards based on page num with useState
  const handleGetMoreCards = async () => {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v1/cards?pageSize=20&page=${page}`
      );
      const data = await response.json();

      setAllPokemonCards(prev => [...prev, ...data.cards]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className='header'>
        <h1>Pokemon Cards</h1>
        <button className='btn' type='button' onClick={handleGetMoreCards}>
          Get More Cards
        </button>
      </div>
      <ul className='pokemon-list'>
        {allPokemonCards.map(card => {
          return (
            <li key={card.id} className='pokemon-list-item'>
              <img src={card.imageUrl} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
