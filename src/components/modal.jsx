import React from "react";
import "./modal.css" 

export default function Modal({close,  product}) {
  return (
    <div className="modalBackground">
      <div className="contentContainer">
        <div className="titleOfModal">
         <h3>{product.title}</h3>
         


        </div>
        <div className="modalBody">
            <p>{product.description}</p>
    
        </div>
        <button onClick={close} className="modalBodyButton">close </button>
      </div>
    </div>
  );
}
