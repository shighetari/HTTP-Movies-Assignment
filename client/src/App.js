import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovie from "./components/updateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  //setting up new state for refreshing in movie for delete function
  const [refresh, setRefresh] = useState(true)


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response))
      //added refresh for CDM since useEffect will always mount initially when first mounted
      .finally(() => setRefresh(false))
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]); //set refresh from state: rerender the getMovieList function whenever refresh changes

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList}  setRefresh={setRefresh}/>
      </Route>
      {/* start of my route */}
      <Route
        path="/update-movie/:id"
        // render = {() =>  <UpdateMovie setMovieList={setMovieList} /> }
      >
        <UpdateMovie setMovieList={setMovieList} movieList={movieList} />
      </Route>
    </>
  );
};

export default App;
