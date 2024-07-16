import React, { useEffect, useState } from 'react'
import genreids from '../utility/genre'

function WatchList({watchList, setWatchList, handleRemoveFromWatchList}) {
    const[search, setSearch] = useState('')
    const[genreList, setGenreList] = useState(['All Genres'])
    const[curGenre, setCurGenre] = useState('All Genres')

    let handleSearch = (evnt) => {
        setSearch(evnt.target.value)
    }

    let handleFilter = (genre) => {
        setCurGenre(genre)
    }

   let sortIncreasing = () => {
        let sortedIncreasing = watchList.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average
        })

        setWatchList([...sortedIncreasing])
   }

   let sortDecreasing = () => {
        let sortedDecreasing = watchList.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average
        })

        setWatchList([...sortedDecreasing])
    }

    useEffect(() => {
        let temp = watchList.map((movieObj) => {
            return genreids[movieObj.genre_ids[0]]
        })
        
        temp = new Set(temp)
        
        setGenreList(['All Genres', ...temp])
        console.log(temp)
    }, [watchList])

    return (
        <>
            <div className='flex justify-center flex-wrap m-4 gap-5'>
                {genreList.map((genre, index) => {
                    return <div key={index} onClick={() => handleFilter(genre)} className={curGenre == genre ? 'flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold cursor-default' : 
                        'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold cursor-default'}>{genre}</div>
                })}
            </div>

            <div className='my-4 flex justify-center'>
                <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies' className='px-4 h-[3rem] w-[18rem] bg-gray-200 outline-none'/>
            </div>

            <div className='m-8 border border-gray-200 rounded-lg overflow-hidden'>
                <table className='w-full text-gray-500 text-center'>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='w-[55vw]'>Name</th>
                            
                            <th className='flex justify-center items-center'>
                                <div onClick={sortIncreasing}><i class="fa-solid fa-arrow-up cursor-pointer mr-2"></i></div>
                                <div>Rating</div>
                                <div onClick={sortDecreasing}><i class="fa-solid fa-arrow-down cursor-pointer ml-2"></i></div>
                            </th>

                            <th>Popularity</th>
                            <th>Genre</th>
                        </tr>
                    </thead>

                    <tbody>
                        {watchList.filter((movieObj) => {
                            if (curGenre === 'All Genres') {
                                return true
                            } else {
                                return curGenre == genreids[movieObj.genre_ids[0]]
                            }
                        }).filter((movieObj) => {
                            return movieObj.title.toLowerCase().includes(search.toLowerCase())
                        }).map((movieObj) => (
                            <tr key={movieObj.id} className='border-b-2'>
                                <td className='flex items-center px-4 py-2 bg-cover'>
                                    <img className='h-[9rem] w-[15rem]' src={`http://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt="poster" style={{ objectFit: 'contain' }}/>

                                    <div className='mx-10'>
                                        {movieObj.title}
                                    </div>
                                </td>

                                <td>{movieObj.vote_average}</td>
                                <td>{movieObj.popularity}</td>
                                <td>{genreids[movieObj.genre_ids[0]]}</td>

                                <td>
                                    <span onClick={() => handleRemoveFromWatchList(movieObj)} className='text-red-800 cursor-pointer'>Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WatchList