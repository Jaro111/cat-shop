import "./catCard.css";
import { faker, fakerEN_GB } from "@faker-js/faker";
import { IoIosCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
// import Modal from "./Modal";

export default function CatCard({ cat, addCat, catPrice}) {
  const [toggle, setToggle] = useState(true);
  const [price, setPrice] = useState(0)
  

  const createRandomCatDetails = () => {
    const randSex = faker.person.sexType();
    const randCatName = faker.person.firstName(randSex);
    const randCatBreed = faker.animal.cat();
    const randLoc = fakerEN_GB.location.county();
    const randEmail = fakerEN_GB.internet.email();
    const randPhone = fakerEN_GB.phone.number();
    // const randPrice = faker.finance.amount({
    //   min: 100,
    //   max: 1000,
    //   dec: 2,
    //   symbol: "£",
    // });

    return [
      randCatName,
      randCatBreed,
      randSex,
      randLoc,
      randPhone,
      randEmail,
      // randPrice,
    ];
  };

  const randomCat = createRandomCatDetails();

  const addToBasket = (item) => {
    if(basket.includes(item)) {
      console.log("item already in basket")
    } else {
      let newBasket = []
      newBasket = [...basket]
      newBasket.push(item)
      setBasket(newBasket)
    }
    console.log(basket)
    }
  //   console.log(randomCat);

  // const totalCount = (itemPrice) => {
  //   setPrice(itemPrice)
  //   setTotal(total + price)

    // open modal/side panel?
  // };


   

 
 


  return (
    <>
      <div className="catCardCont" >
        <div className="catCardContInner">
          <div className="catCardFront">
            <h2 className="catName">{randomCat[0]}</h2>
            <img className="catImg" src={cat.url} alt="random cat image" />
          </div>
          <div className="catCardBack">
            <p>Breed: {randomCat[1]}</p>
            <p>Gender: {randomCat[2]}</p>
            <p>Born In: {randomCat[3]}</p>
            <p>OWNER CONTACT</p>
            <p>
              <IoIosCall /> {randomCat[4]}
            </p>
            <p>
              <MdOutlineMailOutline /> {randomCat[5]}
            </p>
            <p>{catPrice}</p>
            <button onClick={addCat} className="btnInfo">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

