import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Howl } from "howler";
import SoundSrc from "../../assets/sounds/select.mp3";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Item = (props) => {
  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const maxWidth = 650;
  let containerColor = "";
  useEffect(() => {
    const widthChange = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", widthChange);

    return () => {
      window.removeEventListener("resize", widthChange);
    };
  }, [screenWidth]);

  {
    screenWidth < maxWidth
      ? (containerColor = props.type[0] + " thumb-container width-image")
      : (containerColor = props.type[0] + " thumb-container");
  }

  return (
    <article key={props.id} onClick={() => callMySound(SoundSrc)}>
      <Link className={containerColor} to={`/pokemon/${props.name}`}>
        <LazyLoadImage
          alt={props.name}
          src={props.image}
          width={screenWidth < maxWidth ? "75px" : ""}
          visibleByDefault={false}
          delayMethod={"debounce"}
          effect="blur"
          className="pokemon-image"
        />

        <div className="detail-wrapper">
          <h3 className="capitalize-first-letter font-bold">{props.name}</h3>
          <ul>
            {props.type?.map((type, index) => (
              <li key={index} className="pokemon-type-container">
                <div className={props.type[index] + "-type type-badge"}></div>
                <span className="capitalize-first-letter">{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
};

export default Item;
