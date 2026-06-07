/* Body of adoption page, contains the main content of the page */
import React from 'react'

import Header from './Header.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'

const AdoptionPage = () => {
  
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

export default AdoptionPage;