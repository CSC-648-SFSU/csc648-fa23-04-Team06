import React from 'react';

function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li className="navitem">
          <a href="/">Link</a>
        </li>
        <li className="navitem">
          <a href="/about">Link</a>
        </li>
        <li className="navitem">
          <a href="/contact">Link</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
