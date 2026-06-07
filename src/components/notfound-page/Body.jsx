import React from 'react'
import { useNavigate } from "react-router";

import WarningBanner from "../../components/others/WarningBanner.jsx";

const Body = () => {
    const navigate = useNavigate();
 
    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 gap-3 font-assistant flex-1">
                <WarningBanner />

                {/* Not found */}

                <div className="max-w-full">
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                        <h1 className="text-5xl font-bold text-pink-primary mb-4">
                            404
                        </h1>

                        <h2 className="text-2xl font-semibold text-custom-text-color mb-3">
                            Ups... esta página no existe 🐾
                        </h2>

                        <p className="text-gray-600 max-w-md mb-6">
                            Parece que el enlace que estás buscando no existe o fue movido.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300"
                        >
                            Volver al inicio
                        </button>

                        </div>
                </div>

                

            </div>
        </>
        
    )
}

export default Body;