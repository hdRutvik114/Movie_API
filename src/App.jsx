import { useState, useEffect } from 'react'
import axios from "axios";
import {useDebounce} from 'react-use'
import Search from './Component/Search'
import Moviecard from './Component/moviecard';
const api_baseurl = 'https://api.themoviedb.org/3';
const VITE_TMDBCODE1 = import.meta.env.VITE_TMDBCODE;
import { getTrendingmoives, updateSearchCount } from '../appwrite';


function App() {
  const [count, setCount] = useState(0);
  const [searchTerm, setsearchTerm] = useState("");
  const [error, seterror] = useState()
  const [movielist, setmovielist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
 const [debouncesearch, setdebouncesearch] = useState('')
const [trendingmovies, settrendingmovies] = useState('')   // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms











  useDebounce(()=>setdebouncesearch(searchTerm),1000,[searchTerm])
  





  const fetchmovie = async (query = '') => {
    setisLoading(true);
    seterror("");
    try {
      const endpoint = query ? `${api_baseurl}/search/movie?query=${encodeURIComponent(query)}`:`${api_baseurl}/discover/movie?sort_by=popularity.desc`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${ VITE_TMDBCODE1 } `
        }
      }
      );

      const data = await response.data;
      console.log(data);

      if (data.response === 'False') {
        seterror(data.Error || 'Failed to fetch movies');
        setmovielist([]);
        return
      }
 
      setmovielist(data.results || []);
      if(query&&data.results.length>0)
 {
     await  updateSearchCount(query,data.results[0]);
      }
 
     
    } catch (err) {

      console.error("Error fetchign movies");
      seterror('error Fetching moveies Please try again');
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchmovie(debouncesearch)
  }, [debouncesearch])
  
  useEffect(()=>{
    loadtrendingmoives();
  },[]) 

const loadtrendingmoives=async()=>{
   try {
     const movies=await getTrendingmoives();
   console.log("goychja"+movies)
  settrendingmovies(movies)
   } catch (error) {
    console.error(err)
   }
}
  
  return (
    <>
      <main>
        <div className='pattern' />
        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="" />
            <h1>Find <span className='text-gradient'>Movies</span>You'll Enjoy WIthout the Hassle</h1>

            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />

          </header>
          {
            trendingmovies.length>0&&(
              <section className='trending'>
                <h2>Trending Movies</h2>
                <ul>
                  {trendingmovies.map((movie,index)=>(
                    <li key={movie.$id}><p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title}/>
                    </li>
                  ))}
                </ul>

              </section>
            )
          }
          <section className='all-movies '>
            <h2 className='mt-[40px]'> All Movies</h2>
            {
              isLoading ? (

                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>

              ) : error ? (
                <p className='text-red-500'>{error}</p>
              ) : (
                <ul>
                  {
                    movielist.map((i, ind) =>
                      <Moviecard key={ind} movie={i} />
                    )
                  }
                </ul>
              )
            }
          </section>


          <h1>{searchTerm}</h1>
        </div>
      </main>
    </>
  )
}

export default App
