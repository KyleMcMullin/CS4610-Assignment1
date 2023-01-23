import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote {
  content: string;
  author: string;
}

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  async function findRandom() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    setRandomQuote(await result.json());
  }

  useEffect(() => {
    findRandom();
  }, []);

  function performSearch() {
    fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchInput}`)
      .then(res => res.json())
      .then((results) => {
        setSearchResults(results.results)
      });
  }

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <div className="card">
        <input
          className = "round"
          type="search"
          placeholder="Search for a quote"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div className="random-quote">
        <p>{(randomQuote === null) ? "" : randomQuote.content}</p>
        <h4>-{(randomQuote !== null) ? ((randomQuote.author !== "")  ? randomQuote.author : "Unknown") : ""}</h4>
      </div>
    </div>
  )
}

export default App
