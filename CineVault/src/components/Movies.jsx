import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({watchList, handleAddtoWatchList, handleRemoveFromWatchList}) {
    const[movies, setMovies] = useState([])
    const[pageNo, setPageNo] = useState(1)

    const handlePrev = () => {
        if (pageNo == 1) {
            setPageNo(pageNo)
        } else {
            setPageNo(pageNo - 1);
        }
    }

    const handleNext = () => {
        setPageNo(pageNo + 1);
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a3e6f81e8c63682750c39721008115b9&language=en-US&page=${pageNo}`).then(function(res){
            setMovies(res.data.results)
            console.log(res)
        })
    }, [pageNo])

    return (
        <div className='p-5'>
            <div className='text-2xl m-5 text-center font-bold'>
                Trending Movies
            </div>

            <div className='flex flex-row flex-wrap justify-around grid grid-cols-5'>
                {movies.map((movieObj) => {
                    return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} watchList={watchList} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>
                })}
            </div>

            <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext}/>
        </div>
    )
}

export default Movies

// https://api.themoviedb.org/3/movie/popular?api_key=a3e6f81e8c63682750c39721008115b9&language=en-US&page=2