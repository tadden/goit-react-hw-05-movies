import { useEffect, useState } from "react/cjs/react.development";
import { useParams,  } from "react-router-dom";
import { FetchReviews } from '../API/movie-api';


export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        FetchReviews(movieId).then(setReviews)
    }, [movieId]);

     if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

    return (
      <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
    )
};