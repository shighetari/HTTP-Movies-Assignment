import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";

function Movie({ addToSavedList, setRefresh}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        // movieList(res.data)
        // forceUpdate()
        setRefresh(true)
        
        console.log(res);
        push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const forceUpdateHandler = ()=> {
  //   this.forceUpdate();
  // };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => push(`/update-movie/${params.id}`)}>Update</button>
      <button onClick={deleteMovie}> Delete </button>
    </div>
  );
}

export default Movie;
