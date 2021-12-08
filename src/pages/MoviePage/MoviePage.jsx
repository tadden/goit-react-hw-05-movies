import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { fetchMovies } from '../../components/API/movie-api';
import { Link } from "react-router-dom";

export default function SearhView() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        if (!query) {
            return;
        }
    });

    const handleChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const onSubmit = query => {
        fetchMovies(query).then(setMovies);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") {
            return toast.error("Enter search query!");
        }
        onSubmit(query);

        setQuery("");
    }

    return (
        <>
            <form className='form' onSubmit={(handleSubmit)}>
                <label className='label'>
                    <input
                        className='input'
                        value={query}
                        name='query'
                        type='text'
                        autoComplete='off'
                        placeholder='Search movie'
                        onChange={handleChange}></input>
                    <button type='submit' className='button'>
                        Search
                    </button>
                </label>
            </form>
                
            {movies && (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={`${movie.id}`}>{movie.title}</Link>
                        </li>
                        
                    ))}
                </ul>
            )}
                
                
        </>
    );
    };
