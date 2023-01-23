import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");
  const [randomAuthor, setRandomAuthor] = useState("");

  useEffect(() => {
    fetch("https://usu-quotes-mimic.vercel.app/api/random")
      .then(res => res.json())
      .then((quote) => {
        setRandomQuote(quote.content)
        setRandomAuthor(quote.author)
      })
    return () => {}
  }, []);

  function performSearch() {
    fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchInput}`)
      .then(res => res.json())
      .then((results) => {
        setSearchResults(results.results)
      })
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
        <p>{randomQuote}</p>
        <h4>-{(randomAuthor !== "")  ? randomAuthor : "Unknown"}</h4>
      </div>
    </div>
  )
}

export default App
