import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import NavBar from "./NavBar";
import axios from "axios";
import { Howl } from "howler";
import { ToastContainer, toast } from 'react-toastify';
import SoundSrc from "../../assets/sounds/select.mp3";


function ItemListContainer({ historyPage }) {
  console.log("historyPage", historyPage)
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsTypes, setPokemonsTypes] = useState([]);

  const [loadPokemon] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    const getAllPokemons = async (e) => {
      setPokemons([])
      try {
        if (historyPage) {
          const pokemonsHistory = localStorage.getItem('pokemonsHistory') ? JSON.parse(localStorage.getItem('pokemonsHistory')) : [];
          const fetchPokemonData = async () => {
            const requests = pokemonsHistory.map(name =>
              axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            );
            try {
              const responses = await Promise.all(requests);
              const pokemonData = responses.map(response => response.data);
              setPokemons(pokemonData);
              console.log("pokemonData", pokemonData)
            } catch (error) {
              console.error('Failed to fetch Pokémon', error);
            }
          };

          if (pokemonsHistory.length > 0) {
            fetchPokemonData();
          }
          setCurrentPage(1)
        } else {
          const res = await fetch(loadPokemon);
          const data = await res.json();
          console.log("res", res)
          function createPokemonObject(results) {
            results.forEach(async (pokemon) => {
              const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              );
              const data = await res.json();
              setPokemons((list) => [...list, data]);

            });
          }
          createPokemonObject(data.results);
        }
        axios(`https://pokeapi.co/api/v2/type`).then((res) => {
          const { data } = res;

          let resulta = data.results.map((a) => a.name);
          resulta.unshift("All Types");
          let removeType = resulta.indexOf("Shadow");
          resulta.splice(removeType, 1);
          resulta.pop();
          setPokemonsTypes(resulta);

        });
      } catch (error) {
        toast.error("There was an error in loading the Pokemons");
      }
    };
    getAllPokemons();
  }, [historyPage]);

  const [pokemonFilter, setPokeFilter] = useState(pokemons);
  let currentPosts;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  if (pokemonFilter == !pokemons) {
    pokemons.sort((a, b) => (a.id > b.id ? 1 : -1));
    currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost);
    pokemons.slice(indexOfFirstPost, indexOfLastPost);
  } else {
    pokemonFilter.sort((a, b) => (a.id > b.id ? 1 : -1));
    currentPosts = pokemonFilter.slice(indexOfFirstPost, indexOfLastPost);
    pokemonFilter.slice(indexOfFirstPost, indexOfLastPost);
  }

  const searchFilterFunction = (term) => {
    setPokeFilter(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      )
    );
    const typeFilterReset = document.querySelector("#typeFilter");
    typeFilterReset.value = "All Types";
    setCurrentPage(1)
  };

  const typeFilterFunction = (term) => {
    setPokeFilter(
      pokemons.filter((pokemon) =>
        pokemon.types?.map((t) => t.type.name).includes(term.toLowerCase())
      )
    );
    const searchFilterReset = document.querySelector("#searchFilter");
    searchFilterReset.value = "";
    setCurrentPage(1)
  };

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    callMySound(SoundSrc);
  }
  console.log("currentPosts", currentPosts)
  return (
    <div className="container">
      <div className="all-container">
        <NavBar
          pokemonsTypes={pokemonsTypes}
          typeFilterFunction={typeFilterFunction}
          searchFilterFunction={searchFilterFunction}
        />

        <ItemList pokemon={currentPosts} />

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={pokemons.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pokemonFilter={pokemonFilter}
        />
      </div>
    </div>
  );
}
export default ItemListContainer;
