import { useEffect, useState } from "react/cjs/react.development";
import { useParams,  } from "react-router-dom";
import { FetchCast } from '../API/movie-api';

// useNavigate

 export default function Cast() {
     const [credits, setCredits] = useState(null);
     const { movieId } = useParams();

     useEffect(() => {
         FetchCast(movieId).then(setCredits)
     }, [movieId]);

     return (
         <ul>
             {credits &&
                 credits.cast.map(actor =>
                     <li key={actor.id}>
                         <img
                             src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                             alt={`${actor.name}`} />
                         <p>{actor.name}</p>
                         <p>Caracter: {actor.character}</p>
                     </li>
                 )
             }
         </ul>
     );
};
