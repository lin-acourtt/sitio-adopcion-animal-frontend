import React from "react";

const Footer = () => {

    return (
        <footer className="bg-gray-100 text-custom-text-color font-assistant py-4 shrink-0 border border-pink-200 border-1">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} 
                </p>
                <p className="text-xs mt-2">
                    Hecho con amor por el equipo de adopciones. ⭐🐾 
                </p>
            </div>
        </footer>
    );
}

export default Footer;