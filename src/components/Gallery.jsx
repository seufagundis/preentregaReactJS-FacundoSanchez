
import React from 'react';   
 
function Gallery() {   
    const images=  [   
        "https://via.placeholder.com/150"   ,
        "https://via.placeholder.com/150/0000FF" ,  
        "https://via.placeholder.com/150/FF0000"   
    ];   
 
    return (   
        <section style={{ display: "flex", gap: "10px", justifyContent: 
"center", marginTop: "20px" }}>   
            {images.map((src, index) => (   
                <img key={index} src={src} alt={`Imagen ${index + 1}`} 
style={{ width: "150px", height: "150px" }} />   
            ))}   
        </section>   
    );   
}   
 
export default Gallery;   