import React from 'react'

import WarningBanner from "../../components/others/WarningBanner.jsx";

const Body = () => {

 
    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 gap-3 font-assistant flex-1">
                <WarningBanner />

                {/* Puedes ayudarnos */}

                <div className="max-w-full">
                <h1 className="text-4xl md:text-5xl text-center text-custom-text-color font-bold font-caveatbrush mb-4 max-w-full">
                    ⭐ Puedes ayudarnos ⭐
                </h1>
                </div>

                {/* Mostrar detalles de la mascota */}
                
                <div className="bg-white m-5 rounded-lg shadow-md p-6 w-full max-w-7/10 max-w-3xl border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg transition duration-300">
              
                    <p>💳 Ahorros BANCOLOMBIA 43400002972</p>
                    <br></br>
                    <p> Apoya la construcción de nuestro albergue:</p>
                    
                    <a href="https://vaki.co/vaki/casita-de-los-discas?utm_source=copy&utm_medium=toolbar&utm_campaign=v4&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn8VscflOot0QnU-5_CN9W0fvnemI2XNwaX03ZGZaXcxDokAzDdabeuu6oaUc_aem_2YTwllk2dwJZmY_2yDLVqw" target="_blank" >
                    <button
                        className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300"
                    >
                        VAKI
                    </button>
                    </a>


                </div>

                

            </div>
        </>
        
    )
}

export default Body;