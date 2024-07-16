import { useEffect, useState } from "react"
import "./App.css"
import Banner from "./components/Banner"
import Movies from "./components/Movies"
import Navbar from "./components/Navbar"
import WatchList from "./components/WatchList"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// BrowerRouter to enable routing.
// Routes to specify the routes to which routing has to be done.
// Route is a specific route to which a component will route to.

function App() {
  let[watchList, setWatchList] = useState([])

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj]
    localStorage.setItem('cineVault', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }
 
  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movieInList) => { // The filter method is used on the watchlist array. The filter method iterates over the watchList and creates a new array containing all elements that pass the test implemented by the provided function.
      return movieInList.id != movieObj.id
    })
    
    setWatchList(filteredWatchList)
    localStorage.setItem('cineVault', JSON.stringify(filteredWatchList))
    console.log(filteredWatchList)
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('cineVault')

    if (!moviesFromLocalStorage) {
      return
    }

    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter> 
        <Navbar/>

        <Routes>
          <Route path="/" element={<><Banner/> <Movies watchList={watchList} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/></>}/>
          <Route path="/watchlist" element={<WatchList watchList={watchList} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App