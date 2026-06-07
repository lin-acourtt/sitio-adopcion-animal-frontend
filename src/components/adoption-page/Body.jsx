/* Body of adoption page, contains the main content of the page */
import React from 'react'


import { animalAPI } from '../../../services/api.js'
import Animal_Card from './gallery/Animal_Card.jsx'

import WarningBanner from "../../components/others/WarningBanner.jsx";


const Body = () => {

    const [animalData, setAnimalData] = React.useState([]);
    const [isAnimalDataLoaded, setIsAnimalDataLoaded] = React.useState(false);

    const [filter, setFilter] = React.useState("all");

    const getAnimalsFunc = async() => {
        try {
            const response = await animalAPI['getAllAnimals']();
            setAnimalData(response);
            setIsAnimalDataLoaded(true);
            console.log(response)
        } catch (error) {
            console.error("Error fetching animals:", error);
            throw error;
        }
    };

    React.useEffect(() => {
        getAnimalsFunc();
    }, []); // ← Runs once on mount

    const filteredAnimals = animalData.filter((animal) => {
    if (filter === "all") return true;
    if (filter === "dogs") return animal?.species === "dog";
    if (filter === "cats") return animal?.species === "cat";

    return true;
    });
  
    return (
        <>
            <div className="flex min-h-full flex-col items-center  w-full bg-bg-beige1 py-3 flex-1">
                <WarningBanner />

                {/* Filtro */}

                <div className="flex justify-center gap-6 my-8">
                    <button 
                        className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300 border-2 border-transparent hover:border-teal-400"
                        onClick={() => setFilter("all")}
                    >
                        <span className="text-3xl">🐾</span>
                        <span className="text-sm font-medium mt-1">
                        Todos
                        </span>
                    </button>
 
                    <button
                        className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300 border-2 border-transparent hover:border-teal-400"
                        onClick={() => setFilter("dogs")}
                    >
                        <span className="text-3xl">🐶</span>
                        <span className="text-sm font-medium mt-1">
                        Perros
                        </span>
                    </button>

                    <button
                        className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300 border-2 border-transparent hover:border-teal-400"
                        onClick={() => setFilter("cats")}
                    >
                        <span className="text-3xl">🐱</span>
                        <span className="text-sm font-medium mt-1">
                        Gatos
                        </span>
                    </button>

                    </div>

                {/* Galería de mascotas */}

                
                {isAnimalDataLoaded ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 ">

                    
                        {filteredAnimals.map((animal) => (

                           
                            <div className="shadow:lg shadow w-full overflow-hidden border border-white hover:border hover:border-rose-200 hover:border-3 hover:shadow hover:shadow-pink200 hover:shadow-lg rounded-lg transition duration-300">
                                <Animal_Card
                                    className="w-full overflow-hidden"
                                    imageSrc={animal.cover_photo_url}
                                    altText={animal.name}
                                    name={` ${animal.name} ${animal.species === 'dog' ? '🐶' : animal.species === 'cat' ? '🐱' : ''}`}
                                    gender={`${animal.gender === 'male' ? '♂️ Macho' : '♀️ Hembra'}`}
                                    age={
                                        animal.age_years === 0 && animal.age_months === 0
                                        ? ''
                                        : animal.age_years === 0
                                            ? `🎂 ${animal.age_months} ${animal.age_months === 1 ? 'mes' : 'meses'}`
                                            : animal.age_months === 0
                                            ? `🎂 ${animal.age_years} ${animal.age_years === 1 ? 'año' : 'años'}`
                                            : `🎂 ${animal.age_years} ${animal.age_years === 1 ? 'año' : 'años'} y ${animal.age_months} ${animal.age_months === 1 ? 'mes' : 'meses'}`
                                    }
                                    ID={animal.id}
                                    
                                />
                            </div>
                            ))}

                    </div>
                ) : (
                    <p className="text-gray-700 mb-4 text-2xl font-assistant">
                        Lo sentimos, no tenemos mascotas disponibles para mostrar en este momento. Por favor, inténtalo de nuevo más tarde. 🐶🐱🐾
                    </p>
                )}


            </div>
        </>
        
    )
}

export default Body;