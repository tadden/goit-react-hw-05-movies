
import axios from 'axios';

export const URL = {
    BASE: 'https://api.themoviedb.org/3',
    KEY: 'aa19f289e41f4e3ac70c0546f19e5928',
    PATH: 'movie',
    SEARCH: 'search',
    TIME: 'day',
};


axios.defaults.baseURL = URL.BASE;
axios.defaults.params = {
    api_key: URL.KEY,
};

export async function fetchTrendingMovies() {
  const { data } = await axios(`${URL.BASE}/trending/${URL.PATH}/${URL.TIME}`);
    return (data.results);
};
export async function fetchMoviesById(movieId) {
    const { data } = await axios(`${URL.BASE}/${URL.PATH}/${movieId}`);
    return (data);
};

export async function FetchCast(movieId) {
    const { data } = await axios(`${URL.BASE}/${URL.PATH}/${movieId}/credits`);
    return (data);
};
export async function FetchReviews(movieId) {
    const { data } = await axios(`${URL.BASE}/${URL.PATH}/${movieId}/reviews`);
    return (data.results);
};
