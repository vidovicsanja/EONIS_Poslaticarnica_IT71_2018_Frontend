import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import {getNazivProizvoda} from "../services/ProizvodiServis";
import "./Search.css";

function Search() {
    const [tern, setTerm] = useState("");
    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setTerm(lowerCase);
    };

    const search = () => {

        getNazivProizvoda();
    }

    
  return (
    <div className="main">
      <h1>Pretraga proizvoda</h1>
      <div className="search">
        <TextField
            onChange={(e) => inputHandler(e)}
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Pretraga"
        />
        <button onClick={search}>
            Trazi
        </button>
      </div>
      </div>
  );

}


export default Search;

