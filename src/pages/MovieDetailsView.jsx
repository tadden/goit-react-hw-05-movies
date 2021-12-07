import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMoviesById } from '../components/API/movie-api';


 const Cast = lazy(() =>
        import('../components/Cast/Cast.jsx'),
    );
    const Reviews = lazy(() =>
        import('../components/Reviews/Reviews.jsx'),
    );


export default function MovieDetailsView() {

    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchMoviesById(movieId).then(setMovie);
    }, [movieId]);
    
    return (
        <>
            <button onClick={() => navigate(-1)}>Go Back</button>
            {movie && <>
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.original_title}`}
                    />
                </div>
                <div><h1>{movie.original_title}</h1>
                    <p>User Score: {`${movie.vote_average}`}</p>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <ul>
                        {movie.genres.map(genre =>
                            <li key={genre.id}>{genre.name}</li>)}
                    </ul>
                </div>
                <div>
                    <p>Additional Information</p>
                    <ul>
                        <li>
                            <Link
                                to={`/movies/${movieId}/cast`}
                                state={{
                                    from: location.state.from,
                                    label: location.state.label,
                                }}
                            >
                                Cast
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/movies/${movieId}/reviews`}
                                state={{
                                    from: location.state.from,
                                    label: location.state.label,
                                }}
                            >
                                Reviews
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Suspense fallback={
                        <Loader
                            type="Puff"
                            color="#02BFFF"
                            height={100}
                            width={100}
                            timeout={3000} />
                    }>
                        <Routes>
                            <Route path="/cast" element={<Cast />} />
                            <Route path="/reviews" element={<Reviews />} />
                        </Routes>
                    </Suspense>
                </div>
                
            </>}
        </>
    );
}