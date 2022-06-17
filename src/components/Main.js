import { Routes, Route } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ItemListContainer from "./item-container/ItemListContainer";
import PokemonDetailContainer from "./pokemon-detail/PokemonDetailContainer";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(true);

  useEffect(() => {
    const promesa = new Promise((res, rej) => {
      setTimeout(() => {
        res(Main);
      }, 2500);
    });
    promesa
      .catch((rej) => {
        toast.error("An error has occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    if (loading) {
      return (
        <div className="loading">
          <img src={require("../assets/items/loading.gif")} alt="loading" />
        </div>
      );
    }

    return (
      <div className="main">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetailContainer />}
          />
        </Routes>
      </div>
    );
  }

export default Main;
