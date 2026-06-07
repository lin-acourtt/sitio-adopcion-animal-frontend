import React from 'react'

import { animalAPI } from '../../../services/api.js'

import AdoptionFormModal from "./AdoptionFormModal";

import WarningBanner from "../../components/others/WarningBanner.jsx";

const Body = ({animalID}) => {

    const [animalData, setAnimalData] = React.useState(null);
    const [isAnimalDataLoaded, setIsAnimalDataLoaded] = React.useState(false);

    const [imageError, setImageError] = React.useState(false);

    const [formOpen, setFormOpen] = React.useState(false);

    const getAnimalFunc = async({animalID}) => {
        try {
            const response = await animalAPI['getAnimal'](animalID);
            setAnimalData(response);
            setIsAnimalDataLoaded(true);
            console.log(response);
        } catch (error) {
            console.error("Error fetching animal:", error);
        }
    };

    {/* Cargar datos de la mascota */}
    React.useEffect(() => {
        getAnimalFunc({animalID});
    }, [animalID]); // ← Runs once on mount
  
    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 gap-3 font-assistant">
                <WarningBanner />

                {/* Perfil de la mascota */}

                <div className="max-w-full">
                <h1 className="text-4xl md:text-6xl text-center text-custom-text-color font-bold font-caveatbrush mb-4 max-w-full">
                    🐾 {animalData?.name} 🐾
                </h1>
                </div>

                {/* Mostrar foto de la mascota, si no hay foto un placeholder */}

                {!animalData?.cover_photo_url || imageError ? (
                    <div className="photo-placeholder">
                        No hay foto disponible, pero pronto lo estará. 🐶🐱
                    </div>
                ) : (
                    <div className="rounded-xl overflow-hidden shadow-lg border border-white max-w-9/10
                                    hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg transition duration-300">
                        <img
                            src={animalData?.cover_photo_url}
                            alt={animalData?.name}
                            onError={() => setImageError(true)}
                            className="h-150 w-auto  object-cover"
                        />
                    </div>
                )}

                {/* Mostrar detalles de la mascota */}

                <div className="bg-white m-5 rounded-lg shadow-md p-6 w-full max-w-9/10 max-w-3xl border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg transition duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-center">{animalData?.name}</h2>
                    <p className="text-gray-700 mb-2"><strong>Especie:</strong> {animalData?.species === 'dog' ? 'Perro 🐶' : animalData?.species === 'cat' ? 'Gato 🐱' : animalData?.species}</p>
                    <p className="text-gray-700 mb-2"><strong>Raza:</strong> {animalData?.breed ? animalData?.breed : 'No especificada'}</p>
                    <p className="text-gray-700 mb-2"><strong>Edad:</strong> {
                                        animalData?.age_years === 0 && animalData?.age_months === 0
                                        ? ''
                                        : animalData?.age_years === 0
                                            ? `${animalData?.age_months} ${animalData?.age_months === 1 ? 'mes' : 'meses'}`
                                            : animalData?.age_months === 0
                                            ? ` ${animalData?.age_years} ${animalData?.age_years === 1 ? 'año' : 'años'}`
                                            : ` ${animalData?.age_years} ${animalData?.age_years === 1 ? 'año' : 'años'} y ${animalData?.age_months} ${animalData?.age_months === 1 ? 'mes' : 'meses'}`
                                    }</p>
                    <p className="text-gray-700 mb-2"><strong>Género:</strong> {animalData?.gender === 'male' ? 'Macho ♂️' : 'Hembra ♀️'}</p>
                    <p className="text-gray-700 mb-2"><strong>Castrado:</strong> {animalData?.is_neutered ? 'Sí' : 'No'}</p>
                    <p className="text-gray-700 mb-2"><strong>Vacunado:</strong> {animalData?.is_vaccinated ? 'Sí' : 'No'}</p>
                    <p className="text-gray-700 mb-2"><strong>Personalidad:</strong> {animalData?.personality ? animalData?.personality : 'No especificada'}</p>
                    <p className="text-gray-700 mb-2"><strong>Historia:</strong> {animalData?.story ? animalData?.story : 'No especificada'}</p>
                    <p className="text-gray-700 mb-2"><strong>Responsabilidades del adoptante:</strong> {animalData?.adopter_responsibilities ? animalData?.adopter_responsibilities : 'No especificado'}</p>
                    <p className="text-gray-700 mb-2"><strong>Disponible:</strong> {animalData?.is_available ? '¡¡¡ Sí !!!' : 'No todavía'}</p>
                
                <div className="text-center mt-6">
                    <button onClick={() => setFormOpen(true)}
                    disabled={!animalData?.is_available}
                    className={`bg-teal-400 text-custom-text-color px-4 py-2 rounded  ${animalData?.is_available ? " cursor-pointer hover:bg-bg-pink1 hover:bg-pink-primary hover:text-white hover:font-bold transition duration-300" : "opacity-50 cursor-not-allowed"}`}>
                        Adoptar a {animalData?.name}
                    </button>
                                    
                    <AdoptionFormModal 
                        isOpen={formOpen} // Agrega un log para verificar el estado
                        onClose={() => setFormOpen(false)}
                        mascota={animalData}           
                        //**mirarluego apiEndpoint="/api/adoptions" // tu endpoint
                    />
                </div>

                </div>

            </div>
        </>
        
    )
}

export default Body;