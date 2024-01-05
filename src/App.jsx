import { useState, useEffect } from "react";
import ShowHolidays from "./components/ShowHolidays";
import RickAndMorty from "./components/RickAndMorty";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [holidays, setHolidays] = useState([]);
  const [rickAndMorty, setRickAndMorty] = useState([]);
  useEffect(() => {
    const getHolidays = async () => {
      try {
        const result = await axios.get(
          "https://date.nager.at/api/v2/publicholidays/2023/US"
        );
        console.log(result);
        setHolidays(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    const getRickAndMorty = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character?page=1"
        );
        const data = await response.json();
        console.log(data.results);
        setRickAndMorty(data.results);
      } catch (e) {
        console.log(e);
      }
    };
    getHolidays();
    getRickAndMorty();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setCount(count + 1)}
      >
        {count}
      </button>
      {holidays.map((data, index) => {
        return <ShowHolidays key={index} name={data.name}></ShowHolidays>;
      })}
      {rickAndMorty.map((data) => {
        return <RickAndMorty key={data.id} name={data.name}></RickAndMorty>;
      })}
    </>
  );
}

export default App;
