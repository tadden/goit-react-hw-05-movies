import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Container from './components/Container';
import AppBar from './components/AppBar/AppBar';
// import errorImage from './pages/error.jpg';
import './App.css';

const HomeView = lazy(() => import('./pages/HomeView'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const MovieDetailsView = lazy(() => import('./pages/MovieDetailsView'));
// const NotFoundView = lazy(() => import('./pages/NotFoundView.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={
          <Loader
            type="Puff"
            color="#02BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Routes>
          <Route path="/*" element={<HomeView />} />          
          <Route path='/movies' element={<MoviePage />} />
          <Route path='/movies/:movieId/*' element={<MovieDetailsView />} />          
        </Routes>
      </Suspense>

      <ToastContainer />
    </Container>
  );
}



// {/* <Route
//             path="/"
//             element={
//               <NotFoundView
//                 errorImage={errorImage}
//                 messadge="Ошибка 404: страница не найдена :("
//               />
//             }
//           /> */}