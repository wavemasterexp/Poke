import _ from "lodash";
import tinycolor from "tinycolor2";
import { useState } from "react";

import Card from "./components/Card";
import "./styles.scss";
import axios from "axios";

export default function App() {
  const [color, setColor] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({});

  async function getPokemon({ target: { value } }) {
    setPokemonName(value);

    try {
      const resp = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${_.lowerCase(value)}`
      );
      setPokemon(resp.data);
    } catch (ex) {
      // do nothing
    }
  }

  return (
    <div
      className="App"
      style={
        tinycolor(color).isValid()
          ? { background: tinycolor(color).toHexString() }
          : {}
      }
    >
      <Card color={color} pokemon={pokemon} />
      <input
        onChange={getPokemon}
        placeholder="Pokemon"
        type="text"
        value={pokemonName}
      />
      <input
        onChange={({ target: { value } }) => {
          setColor(value);
        }}
        placeholder="Color"
        type="text"
        value={color}
      />
      <p
        style={{
          color: tinycolor(color).lighten(40).isLight() ? "white" : "black"
        }}
      >
        Created with{" "}
        <span aria-label="heart" role="img">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://www.michaelmang.dev/blog"
          style={{
            color: tinycolor(color).lighten(40).isLight() ? "white" : "black"
          }}
        >
          Michael Mangialardi
        </a>
      </p>
    </div>
  );
}
