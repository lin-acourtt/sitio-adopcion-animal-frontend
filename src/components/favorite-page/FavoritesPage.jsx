/* Página de Mis Favoritos */
import React from 'react'

import Header from "../adoption-page/Header.jsx";
import Body from "./Body.jsx";
import Footer from "../adoption-page/Footer.jsx";

const FavoritesPage = () => {

    return (
        <>
            <div className="flex min-h-screen flex-col caret-transparent">
                <Header />
                <Body />

                <Footer />
            </div>

        </>

    )
}

export default FavoritesPage;