import { useEffect, useState } from "react";
import "./App.css";
import CatCard from "./components/CatCard";
import { faker, fakerEN_GB } from "@faker-js/faker";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Checkout from "./pages/CheckoutPage"
import Home from "./pages/Home"


// 2 people were doing logic and functionality. I've done backup with my working code. I've pulled the code from the team colab repository and all my data was overwrited. 
// So I've created new repo on my account with my version of the my logic which i've backed up before. 
// I've provided the repo for my team mates


function App() {
  // 
  const [cats, setCats] = useState([]);
  // Randomprices array
  const [randomPrices, setRandomprices] = useState([])
  
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [price, setPrice] = useState(0)
  const [priceArray, setPriceArray] = useState([])
  const [total, setTotal] = useState(0)
  

// Funcction taken from cardCat to generate random price
  const createRandomCatDetails = () => {
    const randPrice = faker.finance.amount({
      min: 100,
      max: 1000,
      dec: 2,
      symbol: "£",
    });
    return randPrice
  }
  // const randomCatPrice = createRandomCatDetails();

// API where You can set limit of cats on the website
  const limit = 40
  const getCats = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=live_1j9u5LnTVpxTZI7rpqtemC1sln7kdJe2A4gfpnora6RrGgNjcRTfptX4rqnpPREA`);

      if (!response.ok) {
        throw new Error("Something went wrong...")
      }

      const data = await response.json();


      setData(data)


    } catch (error) {
      setErrorMsg(error.message)
    }
  };


// Generator  which generates as many prices as the limit of cats i set and leter assign them to the cats
const genRandomPrices = () => {
  let priceArray = []
  for (let i=0; i < limit; i ++)

  { let randomNumber = createRandomCatDetails()

    priceArray.push(randomNumber)
  }
  return priceArray
}




// Function adding to the basket items and calculating the total price
    const addToBasket = (item, index) => {

    if (basket.includes(item)) {
      console.log("item already in basket")
    } else {
      basket.push(item)
      // Price is taken from random price array 
      let tempPrice = Number(randomPrices[index].replace("£", ""))
      let totalPrice = Number(total)
      totalPrice += tempPrice
      // Crearing seperate price array for cats which are added to the prices
      let tempPriceArray = [...priceArray, tempPrice]

      setPriceArray(tempPriceArray)

      console.log(priceArray)
      setPrice(tempPrice)
      setTotal(totalPrice)
    }
    

    
      
  }
    
  // Price update which will reduce the prices when we will remove items from the basket by clicking button
  // Ttis function will be called in removeFromBasket function. Parameter is the index of catc in price Array
    const priceUpdate = (index) => {
      let tempTotal = total
      tempTotal -= priceArray[index]
      setTotal(tempTotal)
      let newArray = [...priceArray]
      newArray.splice(index, 1); 
      setPriceArray(newArray);
      
    }
    // Function to remove items from the backet by clicking button.
    // Parameter is the index of the cats in the basket
    const removeFromBasket = (index) => {
      let newBasket = []
      newBasket = [...basket];
      newBasket.splice(index, 1);
      setBasket(newBasket);
      priceUpdate(index)

    };


  useEffect(() => {
    console.log("comp run")
    getCats();
    setRandomprices(genRandomPrices())
    
  }, []);



  return (
    <>    

          <BrowserRouter>
                
                <nav className="navBar">
                  <Link to='/'><p className="navLink">Home</p></Link>
                  <Link to='/checkoutPage' ><p className="navLink">Checkout</p></Link>
                  
                </nav>
                
                <Routes>
                    {/* Checkout */}
                    <Route exact path='/checkoutPage' element={<Checkout 
                    basketItems = {basket.length}
                    catBasketPrice = {priceArray}
                    basketData = {basket} 
                    removeCat = {removeFromBasket}
                    
                    
                     
                    
                    />} ></Route>
                        <Route exact path='/' element={<Home/>}/>
                </Routes>
          </BrowserRouter> 

      <div className="app">
          <p className="total">Total: {total < 0? total.toFixed(2) * -1: total.toFixed(2)}&nbsp;£</p>
          <p className="total">Basket: {basket.length}</p>

     
          <div className="catCont">
              {cats.length > 0 &&
                  cats.map((item, index) => {        
                      
                      return <CatCard cat={item} key={index} catPrice={randomPrices[index]}  addCat={() => {addToBasket(item.url, index)}}/>;
                  })}

              {cats.length === 0 &&
                  data.length > 0 &&
                  data.map((item, index) => {
                      return <CatCard cat={item} key={index} catPrice={randomPrices[index]}   addCat={() => {addToBasket(item.url, index)}}/>;
                  })}
          </div>
      </div>
    </>
    
  )

}

export default App;