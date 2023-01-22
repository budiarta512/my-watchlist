import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TextInput from './components/form/TextInput';
import SubmitButton from './components/form/button/SubmitButton';
import CardMovie from './components/card/CardMovie';

function App() {
  const [search, setSearch] = useState('')
  const [movie, setMovie] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [searchedMovie, setSearchedMovie] = useState([])
  const [watchlist, setWatchlist] = useState([{}])
  const [message, setMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [detailMovie, setDetailMovie] = useState({})
  const [genre, setGenre] = useState([])

  useEffect(()=> {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b646207c15064772c9d07a52c078afe8')
    .then((res)=> {
      setMovie(res.data.results)
    }).catch(err => {
      console.log(err)
    })
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b646207c15064772c9d07a52c078afe8')
      .then(res => {
        setGenre(res.data.genres)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(()=> {
    if(searchVal) {
      axios.get('https://api.themoviedb.org/3/search/movie?query=' + searchVal + '&api_key=b646207c15064772c9d07a52c078afe8')
      .then(res => {
        setSearchedMovie(res.data.results)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [searchVal])


  const onChangeHandle = (args) => {
    setSearch(args)
  }
  const onSubmitHandle = () => {
    setSearchVal(search)
  }
  const tambahMovieHandle = (data) => {
    setWatchlist(prev => {
      return [
        ...prev,
        {
          ...data
        }
      ]
    })
    setMessage('Film Berhasil Ditambahkan ke Dalam Watchlist')
  }

  const deleteHandle = (args) => {
    setWatchlist(prev => {
      return watchlist.filter((val) => {
        if(val.id !== args) {
          return val
        }
      })
    })
  }

  const lihatMovie = (args) => {
    setOpenModal(!openModal)
    setDetailMovie(args)
  }

  useEffect(()=> {
    setTimeout(()=> {
      setMessage('')
    }, 5000)
  }, [message])

  return (
    <div className="App w-full overflow-x-hidden overflow-y-hidden bg-blue-100 min-h-screen">
      {
        message ?
        <div class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 w-72 fixed top-0 right-0" role="alert">
        {message}
        </div> :
        ''
      }
      <h1 className='text-3xl text-blue-700 text-center py-6'>My Watchlist</h1>
      <div className="w-full mx-4 my-6">
        <h2 className='text-2xl text-blue-700 mb-3'>Popular Movie</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {
            movie.map(val => {
              return (
                <CardMovie data={val} clickHandle={tambahMovieHandle} addMovie={true} detailMovie={true} detailHandle={lihatMovie} />
              )
            })
          }
        </div>
      </div>
      <div className="w-full py-6">
        <h2 className='text-2xl text-blue-700 mb-3 ml-5'>Cari Movie</h2>
        <div className="flex flex-col items-center">
          <div className='w-64 mb-3'>
            <div className='flex gap-2'>
              <TextInput name='Search Movie' type='text' onChangeHandle={onChangeHandle} />
              <SubmitButton name='Search' onSubmitHandle={onSubmitHandle} />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-4">
              {
                searchedMovie.map(val => {
                  return (
                    <CardMovie data={val} clickHandle={tambahMovieHandle} addMovie={true} detailMovie={true} detailHandle={lihatMovie} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className='text-2xl text-blue-700 mb-3 ml-5'>Watchlist</h2>
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-4">
              {
                watchlist ?
                watchlist.map(val => {
                  return (
                    val.title ?
                    <CardMovie data={val} deleteHandle={deleteHandle} detailMovie={true} detailHandle={lihatMovie} /> :
                    ''
                  )
                }) :
                ''
              }
            </div>
          </div>
      </div>

      {/* modal */}
      <div
        className={`relative z-40 ${openModal ? "block" : "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full  sm:w-full sm:max-w-3xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between w-full mb-2">
                <span className="text-sm font-bold text-gray-700">
                  Detail Movie
                </span>
                <button
                  type="button"
                  onClick={()=> setOpenModal(!openModal)}
                >
                  <i className="bi bi-x text-lg"></i>
                </button>
              </div>
              <hr />
              <br />
              {
                detailMovie ?
                <div className="flex gap-4 sm:flex-row flex-col">
                <div className="">
                  <img className="rounded-t-lg h-72" src={'http://image.tmdb.org/t/p/w500/' + detailMovie.poster_path} alt="" />
                </div>
                <div className="w-[70%]">
                  <h3 className='text-xl font-semibold'>{detailMovie.original_title}</h3>
                  <p className='mb-3'>{detailMovie.overview}</p>
                  <p className='font-medium'>Tanggal Rilis : {detailMovie.release_date}</p>
                  <p className='font-medium mb-3'>Popularity : {detailMovie.popularity}</p>
                  <p> Genres : {
                    detailMovie && detailMovie.genre_ids ?
                    genre.map(val => {
                      return (
                        val.id === detailMovie.genre_ids[0] || val.id === detailMovie.genre_ids[1] || val.id === detailMovie.genre_ids[2] ?
                        <span>{val.name}, </span> :
                        ''
                      )
                    }) :
                    ''
                  }</p>
                </div>
              </div> :
              ''
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
