import React from 'react'
import WatchList from './WatchList'

function MovieCard({movieObj, poster_path, watchList, handleAddtoWatchList, handleRemoveFromWatchList}) {
    function doesContain(movieObj) {
        for (let i = 0; i < watchList.length; ++i) {
            if (watchList[i].id == movieObj.id) {
                return true;
            }
        }

        return false;
    }

    return (
        <div className='m-3 ml-10 h-[40vh] w-[200px] bg-center bg-cover rounded-t-lg rounded-b-md hover:scale-125 hover:z-10 duration-300 hover:cursor-pointer relative group' 
        style={{backgroundImage: `url(http://image.tmdb.org/t/p/original/${poster_path})`}}>

            {doesContain(movieObj) ?

            (<div onClick={() => (handleRemoveFromWatchList(movieObj))} className='absolute bottom-2 right-2 w-10 h-10 flex justify-center items-center text-white invisible group-hover:visible bg-black/85 rounded-full border border-2 border-gray-600 hover:border-white hover:shadow-xl transition-all duration-300'>
                &#10060;
            </div>) : 

            (<div onClick={() => (handleAddtoWatchList(movieObj))} className='absolute bottom-2 right-2 w-10 h-10 flex justify-center items-center text-white invisible group-hover:visible bg-black/85 rounded-full border border-2 border-gray-600 hover:border-white hover:shadow-xl transition-all duration-300'>
                <i class="fa-solid fa-plus"></i>
            </div>)}

        </div>
    )
}

export default MovieCard