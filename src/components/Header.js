import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <nav className='navbar'>
       <div className='logo'><b>FINDyourHOME</b></div>
      <ul className='list'>
       <li><Link to="/" className='link'>Explore</Link></li>
       <li><Link to="/Offers" className='link'>Offer</Link></li>
       <li><Link to="/Profile" className='link'>Profile</Link></li>
      </ul>
    </nav>
      
    </>
  )
}
