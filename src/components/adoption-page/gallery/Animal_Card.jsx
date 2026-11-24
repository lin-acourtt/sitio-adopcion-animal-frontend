import React from 'react';
import { Link } from "react-router";

import { useFavorites } from '../../favorite-page/FavoritesContext.jsx';

const Animal_Card = ({ imageSrc, altText, name, gender, age, ID }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(ID);

    return (
        <>
        {/* Tarjeta de mascota: al hacer click se marca / desmarca como favorita */}
        <div
            onClick={() => toggleFavorite(ID)}
            className="relative bg-white h-full rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <img src={imageSrc} alt={altText} className="w-full h-48 object-cover"/>
            <div className="mx-2 p-4 ">
                <h2 className="text-xl font-bold mb-2 font-assistant text-[25px]">{name}</h2>
                <p className="text-gray-700 mb-4">{gender}</p>
                <p className="text-gray-700 mb-4">{age}</p>
                {/* stopPropagation para que "Ver más" no marque la tarjeta como favorita */}
                <Link to={`/perfil/${ID}`} onClick={(e) => e.stopPropagation()}>
                    <button className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300">Ver más</button>
                </Link>
            </div>

            {/* Estrella de favorito, parte inferior derecha */}
            <button
                type="button"
                aria-pressed={favorite}
                aria-label={favorite ? `Quitar a ${altText} de favoritos` : `Agregar a ${altText} a favoritos`}
                title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(ID);
                }}
                className="absolute bottom-3 right-3 p-1 rounded-full transition duration-300 hover:scale-125 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className={`h-8 w-8 transition duration-300 ${favorite ? "fill-pink-500 stroke-pink-500 drop-shadow" : "fill-none stroke-gray-300 hover:stroke-pink-300"}`}
                >
                    <path strokeLinejoin="round" d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.61l-4.73-2.89a.56.56 0 00-.58 0l-4.73 2.89a.56.56 0 01-.84-.61l1.28-5.39a.56.56 0 00-.18-.56l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.47-.35L11.48 3.5z" />
                </svg>
            </button>
        </div>
        </>
    );
}

export default Animal_Card;