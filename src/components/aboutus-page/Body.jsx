import React from 'react'

import WarningBanner from "../../components/others/WarningBanner.jsx";

const Body = () => {

 
    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 gap-3 font-assistant flex-1">
                <WarningBanner />

                {/* Sobre nosotros */}

                <div className="max-w-full">
                <h1 className="text-4xl md:text-5xl text-center text-custom-text-color font-bold font-caveatbrush mb-4 max-w-full">
                    Sobre nosotros
                </h1>
                </div>

                <div className="bg-white m-5 rounded-lg shadow-md p-6 w-full max-w-7/10 max-w-3xl border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg transition duration-300">
                    <p>🐾 Dejando huella, rescatando vidas 👩🏽✨By May </p>
                    <p>🐶🐱 Adopta,dona,transforma💌 ¡Sé parte del cambio!</p>
                    <p>Fundación de rescate animal en barranquilla sin fines de lucro.</p>
                    <p>📍 Colombia 🇨🇴</p>
                    <br></br>
                    <p> Visita nuestra perfil de Instagram para ver nuestra labor:</p>
                    
                    <a href="https://www.instagram.com/huellitascj/" target="_blank" >
                    <button
                        className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300"
                    >
                        Instagram
                    </button>
                    </a>


                </div>

                

            </div>
        </>
        
    )
}

export default Body;