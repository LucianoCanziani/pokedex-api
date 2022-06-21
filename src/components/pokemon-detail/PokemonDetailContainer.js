import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PokemonDetailDesktop from "./PokemonDetailDesktop";
import PokemonDetailMobile from "./PokemonDetailMobile";

const PokemonDetailContainer = () => {
  let { pokemonName } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  let [chainInfo, setChainInfo] = useState(null);

  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      const { data } = res;
      //console.log(data);
      setPokemonDetails(null);
      setPokemonDetails({
        id: data.id,
        name: data.name,
        statsName: data.stats.map((items) => items.stat.name),
        statsRes: data.stats.map((items) => items.base_stat),
        types: data.types.map((items) => items.type.name),
        moves: data.moves.map((items) => items.move.name),
        abilities: data.abilities.map((items) => items.ability.name),
        image: data.sprites.other.dream_world.front_default,
        height: data.height,
        weight: data.weight,
        exp: data.base_experience,
      });
    });

    axios(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then((res) => {
        const { data } = res;
        //console.log(data)
        let fixedDescription = data.flavor_text_entries[0].flavor_text.replace(
          //g,
          " "
        );

        setChainInfo(data.evolution_chain.url);
        setPokemonSpecies({
          description: fixedDescription,
          species: data.genera[7].genus,
          captureRate: data.capture_rate,
          growRate: data.growth_rate.name,
          habitat: data.habitat.name,
        });
      })

      .catch((err) => {
        toast.error("There was an error in loading the Pokemons");
      });
  }, [pokemonName]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const maxWidth = 1150;

  useEffect(() => {
    const widthChange = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", widthChange);

    return () => {
      window.removeEventListener("resize", widthChange);
    };
  }, [screenWidth]);

  return (
    <div className="detail-pokemon-container">
      {screenWidth < maxWidth ? (
        <PokemonDetailMobile
          pokemondetail={pokemonDetails}
          pokemonespecies={pokemonSpecies}
        />
      ) : (
        <PokemonDetailDesktop
          pokemondetail={pokemonDetails}
          pokemonespecies={pokemonSpecies}
        />
      )}
    </div>
  );
};

export default PokemonDetailContainer;
