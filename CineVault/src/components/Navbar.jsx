import React from 'react'
import Logo from '../Movies-CineVault.png'
import { Link } from 'react-router-dom'

// Instead of anchor tag (<a></a>), Link tag is used to avoid web page reloading.
// Link is faster as it just switches between the components.

const Navbar = () => {
    return (
        <div className='flex border space-x-8 items-center pl-3 py-4'>
            <img className='w-[50px]' src={Logo} alt="" />

            <Link to='/' className='text-blue-500 text-3xl font-bold'>Home</Link>
            <Link to='/watchlist' className='text-blue-500 text-3xl font-bold'>WatchList</Link>
        </div>
    )
}

export default Navbar