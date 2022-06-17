import logo from "../../assets/items/pokedex.png";
import { Howl } from "howler";
import SoundSrc from "../../assets/sounds/select.mp3";

const NavBar = ({
  pokemonsTypes,
  searchFilterFunction,
  typeFilterFunction,
}) => {
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
            style="overflow: visible;"
            placeholder="Pokemon search..."
            onChange={(event) => searchFilterFunction(event.target.value)}
            onClick={() => callMySound(SoundSrc)}
          />
        </div>

        <div className="box">
          <select
            style="overflow: visible;"
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
      </div>
    </nav>
  );
};

export default NavBar;
