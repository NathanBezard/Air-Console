import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='navigation-menu'>
        <ol>
            <li><Link to={"/Controller"}>Controller</Link></li>


        </ol>
    </div>

  )
}

export default Navbar
