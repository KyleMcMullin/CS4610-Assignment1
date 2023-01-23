import { useEffect, useState } from 'react'
import './App.css'

interface Quote {
  content: string;
  author: string;
}

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [headerDisplay, setHeaderDisplay] = useState("home-header");
  const [searchDisplay, setSearchDisplay] = useState("home-search");
  const [visible, setVisible] = useState("visible");

  async function findRandom() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    setRandomQuote(await result.json());
  }

  async function performSearch() {
    const results = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchInput}`);
    const json = await results.json();

    setSearchResults(await json.results);
  }

  useEffect(() => {
    findRandom();
  }, []);

  const handleEnter = (event: { key: String }) => {
    if (event.key == "Enter") {
      performSearch();
      setHeaderDisplay("results-header");
      setSearchDisplay("results-search");
      setSearchInput("");
      setVisible("hidden");
    }
  }

  return (
    <div className="App">
      <h1 id={headerDisplay}>Quote Search</h1>
      <div className={searchDisplay}>
        <input
          className = "round"
          type="search"
          placeholder="Search for a quote"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown = {handleEnter} />
      </div>
      <div className="random-quote" id={visible}>
        <p>{(randomQuote === null) ? "" : randomQuote.content}</p>
        <h4>-{(randomQuote !== null) ? ((randomQuote.author !== "")  ? randomQuote.author : "Unknown") : ""}</h4>
      </div>
      {searchResults.map((quote) => (
          <div className="found-quote">
          <p>{quote.content}</p>
          <h4>-{(quote.author !== "" ? quote.author : "")}</h4>
          </div>
      ))};      
    </div>
  )
}

export default App
