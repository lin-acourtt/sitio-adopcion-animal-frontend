import React from 'react';
import { Link } from "react-router";

const Animal_Card = ({ imageSrc, altText, name, gender, age, ID }) => {
    return (
        <>
        {/* Tarjeta de mascota */}
        <div className="bg-white h-full rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ">
            <img src={imageSrc} alt={altText} className="w-full h-48 object-cover"/>
            <div className="mx-2 p-4 ">
                <h2 className="text-xl font-bold mb-2 font-assistant text-[25px]">{name}</h2>
                <p className="text-gray-700 mb-4">{gender}</p>
                <p className="text-gray-700 mb-4">{age}</p>
                <Link to={`/perfil/${ID}`} >
                    <button className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300">Ver más</button>
                </Link>
            </div>
        </div>
        </>
    );
}

export default Animal_Card;