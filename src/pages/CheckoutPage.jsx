import React from "react";
import App from "../App";





function Checkout(props) {



    return (
 
            props.basketData.map((item, index) => {

                return (
                    <div className="checkoutSpace" key = {index}>
                <img className="basketImage" src={props.basketData[index]}  alt="basketCat"></img>
                <h1>{props.catBasketPrice[index]}</h1>
                <button className="removeBtn" onClick={() =>{props.removeCat(index)}}>X</button>
                    </div>
                )
                
            
                
            }
        )

    )
}



export default Checkout;