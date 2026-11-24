import React from 'react'
import { useNavigate } from "react-router";

import { animalAPI } from '../../../services/api.js'
import Animal_Card from '../adoption-page/gallery/Animal_Card.jsx'
import { useFavorites } from '../favorite-page/FavoritesContext.jsx';

import WarningBanner from "../../components/others/WarningBanner.jsx";

/* Mismo formato de edad que usa la página de adopciones */
const formatAge = (years, months) => {
    if (years === 0 && months === 0) return '';
    if (years === 0) return `🎂 ${months} ${months === 1 ? 'mes' : 'meses'}`;
    if (months === 0) return `🎂 ${years} ${years === 1 ? 'año' : 'años'}`;
    return `🎂 ${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
};

const Body = () => {
    const navigate = useNavigate();
    const { favoriteIds } = useFavorites();

    const [animalData, setAnimalData] = React.useState([]);
    const [isAnimalDataLoaded, setIsAnimalDataLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
        const getAnimalsFunc = async() => {
            try {
                const response = await animalAPI['getAllAnimals']();
                setAnimalData(response);
            } catch (error) {
                console.error("Error fetching animals:", error);
                setHasError(true);
            } finally {
                setIsAnimalDataLoaded(true);
            }
        };
        getAnimalsFunc();
    }, []); // ← Runs once on mount

    /* Solo las mascotas marcadas como favoritas */
    const favoriteAnimals = animalData.filter((animal) => favoriteIds.includes(String(animal.id)));

    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 gap-3 font-assistant flex-1">
                <WarningBanner />

                {/* Título */}

                <div className="max-w-full">
                    <h1 className="text-4xl md:text-5xl text-center text-custom-text-color font-bold font-caveatbrush mb-4 max-w-full">
                        ⭐ Mis favoritos ⭐
                    </h1>
                </div>

                {!isAnimalDataLoaded ? (
                    <p className="text-gray-700 mb-4 text-2xl font-assistant">
                        Cargando tus favoritos... 🐾
                    </p>
                ) : hasError ? (
                    <p className="text-gray-700 mb-4 text-2xl font-assistant text-center px-5">
                        No pudimos cargar tus favoritos en este momento. Por favor, inténtalo de nuevo más tarde. 🐶🐱🐾
                    </p>
                ) : favoriteAnimals.length === 0 ? (

                    /* Sin favoritos aún */
                    <div className="bg-white m-5 rounded-lg shadow-md p-6 w-full max-w-3xl border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                        <span className="text-6xl mb-4">🐾</span>
                        <h2 className="text-2xl font-semibold text-custom-text-color mb-3">
                            Sin favoritos aún
                        </h2>
                        <p className="text-gray-600 max-w-md mb-6">
                            Toca la tarjeta de una mascota en adopción y quedará marcada con una estrella rosa ⭐ para que la encuentres aquí.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-teal-400 hover:bg-bg-pink1 cursor-pointer text-custom-text-color px-4 py-2 rounded hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300"
                        >
                            Ver mascotas en adopción
                        </button>
                    </div>

                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 ">
                        {favoriteAnimals.map((animal) => (
                            <div
                                key={animal.id}
                                className="shadow:lg shadow w-full overflow-hidden border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg rounded-lg transition duration-300"
                            >
                                <Animal_Card
                                    imageSrc={animal.cover_photo_url}
                                    altText={animal.name}
                                    name={` ${animal.name} ${animal.species === 'dog' ? '🐶' : animal.species === 'cat' ? '🐱' : ''}`}
                                    gender={`${animal.gender === 'male' ? '♂️ Macho' : '♀️ Hembra'}`}
                                    age={formatAge(animal.age_years, animal.age_months)}
                                    ID={animal.id}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>

    )
}

export default Body;