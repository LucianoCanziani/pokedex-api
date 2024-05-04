import logo from "../../assets/items/pokedex.png";
import { Howl } from "howler";
import SoundSrc from "../../assets/sounds/select.mp3";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({
  pokemonsTypes,
  searchFilterFunction,
  typeFilterFunction,
}) => {
  const location = useLocation();

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  return (
    <nav className="nav-bar">
      <img
        src={logo}
        className="logo"
        height="50px"
        onClick={() => callMySound(SoundSrc)}
      />

      <div className="filters">
        <div className="search-container">
          <input
            className="search-input"
            id="searchFilter"
            type="text"
            placeholder="Pokemon search..."
            onChange={(event) => searchFilterFunction(event.target.value)}
            onClick={() => callMySound(SoundSrc)}
          />
        </div>

        <div className="box">
          <select
            className="decoration"
            id="typeFilter"
            onChange={(event) => typeFilterFunction(event.target.value)}
            onClick={() => callMySound(SoundSrc)}
          >
            {pokemonsTypes?.map((type, index) => (
              <option className="option-type" key={index} value={type}>
                {pokemonsTypes[index].charAt(0).toUpperCase() +
                  pokemonsTypes[index].slice(1)}
              </option>
            ))}
          </select>
        </div>
        {location.pathname.includes("/pokemon-history") ? (
          <Link onClick={() => callMySound(SoundSrc)} to="/" className="close_icon"></Link>
        ) : (
          <Link onClick={() => callMySound(SoundSrc)} to="/pokemon-history" className="history_icon"></Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
