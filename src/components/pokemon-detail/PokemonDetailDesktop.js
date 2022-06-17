import { React, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import { Howl } from "howler";
import SoundSrc from "../../assets/sounds/select.mp3";
import back from "../../assets/items/back.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PokemonDetailDesktop = (props) => {
  const containerColorDetail = props.pokemondetail.types
    ? props.pokemondetail.types[0] + " detail-container"
    : "";

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const typeCont = document.querySelector(".pokemon-detail-types-cont");

  if (props.pokemondetail.types) {
    if (props.pokemondetail.types[1]) {
      typeCont.setAttribute("style", "justify-content: space-between");
    } else {
      typeCont.setAttribute("style", "justify-content: center");
    }
  }

  return (
    <div className={containerColorDetail}>
      <Link className="back-link" to={"/"}>
        <img src={back} onClick={() => callMySound(SoundSrc)} width="50px" />
      </Link>
      <div className="detail-pokemon-selected">
        <div className="detail-pokemon detail-bubble1">
          <h2 className="capitalize-first-letter pokemon-detail-name">
            {props.pokemondetail.name}
          </h2>
          <LazyLoadImage
            alt={props.pokemondetail.name}
            src={props.pokemondetail.image}
            width={"100%"}
            height={"75%"}
            visibleByDefault={false}
            delayMethod={"debounce"}
            effect="blur"
          />

          <ul className="pokemon-detail-types-cont">
            {props.pokemondetail.types?.map((type, index) => (
              <li
                className="capitalize-first-letter pokemon-type-container pokemon-type-container-detail"
                key={index}
              >
                <div
                  className={
                    props.pokemondetail.types[index] +
                    "-type-detail type-badge-detail"
                  }
                ></div>
                <span className="capitalize-first-letter">{type}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-pokemon-detail detail-bubble2">
          <Tabs>
            <TabList>
              <Tab
                className="detail-tab font-bold"
                onClick={() => callMySound(SoundSrc)}
              >
                About
              </Tab>
              <Tab
                className="detail-tab font-bold"
                onClick={() => callMySound(SoundSrc)}
              >
                Base Stats
              </Tab>
              <Tab
                className="detail-tab font-bold"
                onClick={() => callMySound(SoundSrc)}
              >
                Moves
              </Tab>
            </TabList>
            <TabPanel>
              <h2 className="description-tittle">Description</h2>
              <p className="description-pokemon">
                {props.pokemonespecies.description}
              </p>

              <div>
                <div className="about-detail">
                  <span className="about-detail-item">Pokedex Id</span>
                  <span className="capitalize-first-letter">
                    N° {props.pokemondetail.id}
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Species</span>
                  <span className="capitalize-first-letter">
                    {props.pokemonespecies.species}
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Habitat</span>
                  <span className="capitalize-first-letter">
                    {props.pokemonespecies.habitat}
                  </span>
                </div>

                <div className="about-detail">
                  <span className="about-detail-item">Height</span>
                  <span className="capitalize-first-letter">
                    {props.pokemondetail.height / 10}M
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Weight</span>
                  <span className="capitalize-first-letter">
                    {props.pokemondetail.weight / 10}Kg
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Base Exp</span>
                  <span className="capitalize-first-letter">
                    {props.pokemondetail.exp}
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Capture Rate</span>
                  <span className="capitalize-first-letter">
                    {((props.pokemonespecies.captureRate / 255) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                </div>
                <div className="about-detail">
                  <span className="about-detail-item">Grow Rate</span>
                  <span className="capitalize-first-letter">
                    {props.pokemonespecies.growRate}
                  </span>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="stat-abilities-flex">
                <h2 className="description-tittle">Abilities</h2>
                <ul className="list-style-none pokemon-abilities">
                  {props.pokemondetail.abilities?.map((abilities, index) => (
                    <li className="capitalize-first-letter" key={index}>
                      {abilities}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="stat-abilities-cont">
                <h2 className="description-tittle">Stats</h2>
                <ul className="list-style-none">
                  {props.pokemondetail.statsName?.map((stats, index) => (
                    <li
                      className="capitalize-first-letter about-detail"
                      key={index}
                    >
                      <div>
                        <span className="about-detail-item">{stats}: </span>
                      </div>
                      <div className="stats-data">
                        <span>{props.pokemondetail.statsRes[index]}</span>
                        <progress
                          max="200"
                          value={props.pokemondetail.statsRes[index]}
                        ></progress>
                        <span>200</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>

            <TabPanel>
              <ul className="test list-style-none">
                {props.pokemondetail.moves?.map((moves, index) => (
                  <li
                    className="capitalize-first-letter moves-item"
                    key={index}
                  >
                    {moves}
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default PokemonDetailDesktop;
