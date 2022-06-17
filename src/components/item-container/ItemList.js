import { React } from "react";
import Item from "./Item";

const ItemList = (props) => {
  return (
    <div className="pokemon-container">
      {props.pokemon.map((currentPosts) => (
        <Item
          key={currentPosts.id}
          id={currentPosts.id}
          image={currentPosts.sprites.other.dream_world.front_default}
          name={currentPosts.name}
          type={currentPosts.types?.map((t) => t.type.name)}
        />
      ))}
    </div>
  );
};

export default ItemList;
