import React from "react";
import { connect } from "react-redux";
import Rating from "./Rating.js";

const Rate = ({ number }) => {
  let rate = "";
  for (let i = 0; i < number; i++) {
    rate += "★";
  }

  rate = rate.padEnd(5, "☆");

  return <span className="movie-rating">{rate}</span>;
};

const MovieCard = props => {
  const { movie = {}, deleteMovie = () => {}, editMovie = () => {} } = props;
  const {
    id,
    title = "",
    year = "",
    image = "https://www.mearto.com/assets/no-image-83a2b680abc7af87cfff7777d0756fadb9f9aecd5ebda5d34f8139668e0fc842.png",
    rate = -1
  } = movie;

  return (
    <div className="movie-card" onDoubleClick={() => editMovie(movie)}>
      <div className="movie-delete-button" onClick={() => deleteMovie(id)}>
        X
      </div>
      <Rate number={rate} />
      <div
        className="movie-image"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="movie-description">
        {title} - {year}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMovie: id => {
      dispatch({
        type: "DELETE_MOVIE",
        id: id
      });
    },

    editMovie: movie => {
      console.log(movie);
      dispatch({
        type: "EDIT_MOVIE",
        id: movie.id,
        movie: {
          title: prompt("Movie title", movie.title),
          year: prompt("Release year", movie.year),
          rate: prompt("Rating number", movie.rate),
          image: prompt("Image link", movie.image)
        }
      });
    }
  };
};

const SmartMovieCard = connect(null, mapDispatchToProps)(MovieCard);

export default SmartMovieCard;
