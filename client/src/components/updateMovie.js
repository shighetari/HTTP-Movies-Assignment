import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Movie from "../Movies/Movie";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
const UpdateMovie = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  }, [id]);

  //start of my update function
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        // console.log(res);
        //newMovieList is like a clone/snapshot of the state movieList but mapped out
        const newMovieList = props.movieList.map((item) => {
          if (item.id === movie.id) {
            return res.data;
          } else {
            return item;
          }
        });
        props.setMovieList(newMovieList);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    //   e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="title of movie"
          value={movie.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="director"
          placeholder="director of movie"
          value={movie.director}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="number"
          name="metascore"
          placeholder="metascore of movie"
          value={movie.metascore}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="stars"
          placeholder="stars of movie"
          value={movie.stars}
          onChange={handleChange}
        />
      </div>
      <button> submit movie</button>
    </form>
  );
};

export default UpdateMovie;
