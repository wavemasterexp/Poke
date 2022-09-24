import axios from "axios";
import _ from "lodash";
import nearestColor from "nearest-color";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";

export default function Card({ color, pokemon }) {
  const codeColor = tinycolor(color);
  const lightCodeColor = tinycolor(color).lighten(40);

  const [colorNames, setColorNames] = useState([]);

  useEffect(() => {
    async function run() {
      const resp = await axios.get("https://color-names.herokuapp.com/v1/");
      setColorNames(resp.data.colors);
    }

    run();
  }, []);

  const colors = colorNames.reduce(
    (o, { name, hex } = {}) => Object.assign(o, { [name]: hex }),
    {}
  );
  const nearest = nearestColor.from(colors) || {};

  return (
    <div
      className="Card"
      style={
        codeColor.isValid()
          ? {
              background: `linear-gradient(${codeColor.toHexString()}, ${lightCodeColor.toHexString()})`
            }
          : {}
      }
    >
      <div className="content">
        <div className="top">
          <p>
            {codeColor.isValid()
              ? nearest(codeColor.toHexString()).name
              : "Orange"}
          </p>
          <div
            className="color"
            style={{
              backgroundColor: codeColor.isValid()
                ? codeColor.toHexString()
                : ""
            }}
          ></div>
        </div>
        <div
          className="middle"
          style={
            codeColor.isValid()
              ? {
                  background: `linear-gradient(${codeColor.toHexString()}, ${lightCodeColor.toHexString()})`
                }
              : {}
          }
        >
          <div>
            <p>{codeColor.isValid() ? codeColor.toHexString() : "#f9bc61"}</p>
            <p>{_.capitalize(pokemon?.name) || "Charizard"}</p>
          </div>
          <img
            alt="pokemon"
            src={`https://pokeres.bastionbot.org/images/pokemon/${
              pokemon.id || 6
            }.png`}
          />
        </div>
        <div className="bottom">
          <div>
            <p>Hue</p>
            <p>{Math.round(codeColor.toHsl().h) || 36}</p>
          </div>
          <div>
            <p>Sat</p>
            <p>{Math.round(codeColor.toHsl().s * 100) || 93}</p>
          </div>
          <div>
            <p>Lum</p>
            <p>{Math.round(codeColor.toHsl().l * 100) || 68}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
