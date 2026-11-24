import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const handleError = (error) => {
    const errorMessage = error.response.data.detail ||
                         error.response.data.error  ||
                         error.message ||
                         "Ha escurrido un error en el consumo de la API";
    throw new Error(errorMessage);
}

export const animalAPI = {

    getAllAnimals: async() => {
        try {
            const response = await axios.get(`${baseURL}/animal/`);
            //condicional por si el endpoint devuelve un array directamente o un objeto con la propiedad results
            if (Array.isArray(response.data)) {
                return response.data;
            }

            if (Array.isArray(response.data?.results)) {
                return response.data.results;
            }

            return [];
        } catch (error) {
            handleError(error);
        }
    },

    getAnimal: async(animalID) => {
        try {
            const response = await axios.get(`${baseURL}/animal/${animalID}/`);
            return response.data;
        } catch (error) {
            handleError(error);
        };
    },
};

export const adoptionAPI = {

    submitAdoptionRequest: async(formData) => {
        try {
            const response = await axios.post(`${baseURL}/adoption-request/add/`, formData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};
