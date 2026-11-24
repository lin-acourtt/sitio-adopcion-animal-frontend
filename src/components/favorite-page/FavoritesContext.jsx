import React from 'react';

/* Nombre de la variable donde se guardan los favoritos en el local storage */
const STORAGE_KEY = "favorite_animal_ids";

const FavoritesContext = React.createContext(null);

/* Lee los IDs guardados. Siempre devuelve un array de strings (los IDs de la URL son strings) */
const readStorage = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
        /* Si el borrador está dañado, se ignora */
        return [];
    }
};

export const FavoritesProvider = ({ children }) => {
    const [favoriteIds, setFavoriteIds] = React.useState(readStorage);

    /* Guardar en localStorage cada vez que cambian los favoritos */
    React.useEffect(() => {
        try {
            const next = JSON.stringify(favoriteIds);
            if (localStorage.getItem(STORAGE_KEY) !== next) {
                localStorage.setItem(STORAGE_KEY, next);
            }
        } catch (error) {
            console.error("No se pudieron guardar los favoritos:", error);
        }
    }, [favoriteIds]);

    /* Sincronizar si el usuario tiene varias pestañas abiertas */
    React.useEffect(() => {
        const onStorage = (e) => {
            if (e.key === STORAGE_KEY) setFavoriteIds(readStorage());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const isFavorite = React.useCallback(
        (id) => favoriteIds.includes(String(id)),
        [favoriteIds]
    );

    const addFavorite = React.useCallback((id) => {
        const key = String(id);
        setFavoriteIds((prev) => (prev.includes(key) ? prev : [...prev, key]));
    }, []);

    const removeFavorite = React.useCallback((id) => {
        const key = String(id);
        setFavoriteIds((prev) => prev.filter((favId) => favId !== key));
    }, []);

    const toggleFavorite = React.useCallback((id) => {
        const key = String(id);
        setFavoriteIds((prev) =>
            prev.includes(key) ? prev.filter((favId) => favId !== key) : [...prev, key]
        );
    }, []);

    const value = React.useMemo(
        () => ({
            favoriteIds,
            count: favoriteIds.length,
            isFavorite,
            addFavorite,
            removeFavorite,
            toggleFavorite,
        }),
        [favoriteIds, isFavorite, addFavorite, removeFavorite, toggleFavorite]
    );

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
    const context = React.useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
    }
    return context;
};