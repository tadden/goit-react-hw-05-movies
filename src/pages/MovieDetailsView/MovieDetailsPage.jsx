import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchMoviesById } from '../../components/API/movie-api';
import s from './MovieDetailsPage.module.css';


 const Cast = lazy(() =>
        import('../../components/Cast'),
    );
    const Reviews = lazy(() =>
        import('../../components/Reviews'),
    );


export default function MovieDetailsView() {

    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchMoviesById(movieId).then(setMovie);
    }, [movieId]);
    
    return (
        <>
            <div>
                <button onClick={() => navigate(-1)} className={s.btn}>Go Back</button>
            </div>
            
            {movie && <>
                <div className={s.container}>
                    <div >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.original_title}`}
                            className={s.img}
                        />
                    </div>
                    <div className={s.data}>
                        <h1>{movie.original_title}</h1>
                        <p>User Score: {`${movie.vote_average}`}</p>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                        <h3>Genres</h3>
                        <ul className={s.list}>
                            {movie.genres.map(genre =>
                                <li key={genre.id}>| {genre.name} |</li>)}
                        </ul>
                    </div>
                </div>
                <div className={s.link__list}>
                    <p>Additional Information</p>
                    <ul className={s.additional__list}>
                        <li>
                            <Link
                                to={`/movies/${movieId}/cast`}>
                                Cast
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/movies/${movieId}/reviews`}>
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
                            width={500}
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
