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

  useEffect(()=> {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b646207c15064772c9d07a52c078afe8')
    .then((res)=> {
      setMovie(res.data.results)
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

  useEffect(()=> {
    setTimeout(()=> {
      setMessage('')
    }, 5000)
  }, [message])

  return (
    <div className="App w-full overflow-x-hidden bg-blue-100 min-h-screen">
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
                <CardMovie id={val.id} title={val.original_title} desc={val.overview} img={val.poster_path} clickHandle={tambahMovieHandle} />
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
                    <CardMovie id={val.id} title={val.original_title} desc={val.overview} img={val.poster_path} data={val} clickHandle={tambahMovieHandle} />
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
                    <CardMovie id={val.id} title={val.title} desc={val.desc} img={val.img} deleteHandle={deleteHandle} /> :
                    ''
                  )
                }) :
                ''
              }
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
