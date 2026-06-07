import React from 'react'


const Option_Hamburguer = ({text}) => {
  
    return (
        <>
            <div className="rounded-md py-2 px-4 rounded cursor-pointer
            text-white font-caveatbrush text-[25px]
            hover:bg-rose-400 hover:font-bold
            transition duration-300 ease-in-out">
            
                <lu>{text}</lu>
            </div>
        </>
        
    )
}

export default Option_Hamburguer;