import React from 'react'

import Header from "../../components/adoption-page/Header.jsx";
import Body from "./Body.jsx";
import Footer from "../../components/adoption-page/Footer.jsx";


import { useParams } from "react-router";

const AnimalProfilePage = () => {

    const { id } = useParams();
  
    return (
        <>
            <div className="flex min-h-screen flex-col caret-transparent">
                <Header />
                <Body animalID={id} />
                <Footer />
            </div>
            
        </>
        
    )
}

export default AnimalProfilePage;