/* Body of adoption page, contains the main content of the page */
import React from 'react'

import Header from "../../components/adoption-page/Header.jsx";
import Body from "./Body.jsx";
import Footer from "../../components/adoption-page/Footer.jsx";

const DonationPage = () => {
  
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

export default DonationPage;