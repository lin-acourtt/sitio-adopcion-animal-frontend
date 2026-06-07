/* Body of adoption page, contains the main content of the page */
import React from 'react'

import Header from "../adoption-page/Header.jsx";
import Body from "./Body.jsx";
import Footer from "../adoption-page/Footer.jsx";

const AboutUsPage = () => {
  
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

export default AboutUsPage;