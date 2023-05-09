import React, { useState } from "react";
import {createApi, toJson } from "unsplash-js";

const unsplash = createApi({
    accessKey: "5zqGWIApQwoLMAhP-acr1sB6AvoUSxfoqShaOeFRLps",
  });

export default function SearchPhotos() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const toJson = require("unsplash-js").toJson;

    const searchPhotos = async (e) => {
        e.preventDefault();
        console.log("Submitting the Form");

        unsplash.search
        .getPhotos({query, perPage: 100})
        .then(toJson)
        .then((json) => {
            console.log(json);
            setPics(json.response.results);
        });
        
      };

  return (
    <>
        <form className="form" onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {
            pics.map((pic) => 
                <div className="card" key={pic.id}>
                    <p className="App-p">{pic.user.location}</p>
                    <img
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.full}
                        width = "50%"
                        height = "50%"
                        ></img>
                </div>)
        }
      </div>
    </>
  );
}