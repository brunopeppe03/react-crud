import './Logo.css'
import React from 'react'
import logo from '../../assets/img/oi.png'
import { Link } from 'react-router-dom'


import './Logo.css'

export default props => 
    <aside className='logo'>
        <Link to="/" className='logo'>
            <img src={logo} alt="logo" />
        </Link>
    </aside>