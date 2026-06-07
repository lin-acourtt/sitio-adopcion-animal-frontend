import React from 'react';

import Button_Header from './buttons/Button_Header.jsx';
import Option_Hamburguer from './buttons/Option_Hamburguer.jsx';

import { Link } from "react-router";

const Header = () => {

    const [isOpenHamburger, setIsOpenHamburger] = React.useState(false);

    return (
        <header className="bg-bg-pink1 text-white min-w-full h-15 md:h-25 flex items-center px-5 caret-transparent">
            
            {/* Logo, always visible */}
            <div class="h-full rounded flex ">
                <img class="m-2 rounded-full border border-white border-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHp_DUEgcUbvU14JERMTHuK_FVAUChB92hsQ&s" ></img>     
            </div>

            {/* Navigation menu, only visible on medium and larger screens */}

            <div className="hidden md:block flex items-center md:justify-start justify-between m-5">
                <nav>
                    <ul className="flex space-x-4">
                        <Link to="/"><Button_Header text="Adopciones"/></Link>
                        <Link to="/donacion"><Button_Header text="Donar / Apadrinar"/></Link>
                        <Link to="/sobre-nosotros"><Button_Header text="Sobre Nosotros"/></Link>
                    </ul>
                </nav>
            </div>
            
            {/* Hamburger menu, only visible on small screens */}
            <div className="md:hidden absolute right-5 hover:bg-rose-400 rounded-md
            transition duration-300 ease-in-out">
                <div className={`absolute bg-white shadow shadow-rose-200 shadow-md rounded-lg p-4 right-0 top-14 w-48 ${isOpenHamburger ? 'block' : 'hidden'}`}>
                    <Link to="/"><Option_Hamburguer text="Adopciones"/></Link>
                    <Link to="/donacion"><Option_Hamburguer text="Donar / Apadrinar"/></Link>
                    <Link to="/sobre-nosotros"><Option_Hamburguer text="Sobre Nosotros"/></Link>
                </div>
                <button className="hover:bg-pink-secondary hover:rounded-xl p-2" onClick={() => setIsOpenHamburger(!isOpenHamburger)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                        <rect x="4" y="6" width="16" height="2" rx="1" />
                        <rect x="4" y="11" width="16" height="2" rx="1" />
                        <rect x="4" y="16" width="16" height="2" rx="1" />
                    </svg>
                </button>
            </div>

        </header>
    )
}

export default Header;