import { useEffect, useState } from "react";
import "./App.css";
import CatCard from "./components/CatCard";
import { faker, fakerEN_GB } from "@faker-js/faker";
// import { TheCatAPI } from "@thatapicompany/thecatapi";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Checkout from "./pages/CheckoutPage"
import Home from "./pages/Home"

import { random } from "mathjs";

function App() {

  const [cats, setCats] = useState([]);
  const [randomPrices, setRandomprices] = useState([])
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [price, setPrice] = useState(0)
  const [priceArray, setPriceArray] = useState([])
  const [total, setTotal] = useState(0)
  const limit = 40


  const createRandomCatDetails = () => {
    const randPrice = faker.finance.amount({
      min: 100,
      max: 1000,
      dec: 2,
      symbol: "£",
    });
    return randPrice
  }
  const randomCatPrice = createRandomCatDetails();


  const getCats = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=live_1j9u5LnTVpxTZI7rpqtemC1sln7kdJe2A4gfpnora6RrGgNjcRTfptX4rqnpPREA`);

      if (!response.ok) {
        throw new Error("Something went wrong...")
      }

      const data = await response.json();

      // console.log(data);
      setData(data)


    } catch (error) {
      setErrorMsg(error.message)
    }
  };


  // var item = {name:"bull", text: "sour"};

  // a.findIndex(x => x.name == item.name) == -1 ? a.push(item) : console.log("object already exists")

    const addToBasket = (item, index) => {

    // basket.findIndex(x => x.catImage === item)  === -1? basket.push({catImage: item,price: randomPrices[index]}): console.log("object already exists")
    if (basket.includes(item)) {
      console.log("item already in basket")
    } else {
      basket.push(item)
      let tempPrice = Number(randomPrices[index].replace("£", ""))
      let totalPrice = Number(Math.round(total))
      totalPrice += tempPrice
      let tempPriceArray = [...priceArray, tempPrice]
      setPriceArray(tempPriceArray)
      console.log(priceArray)
      setPrice(tempPrice)
      setTotal(totalPrice)
    }
    

    // const removeFromBasket = (index) => {
    //   let newBasket = []
    //   newBasket = [...basket];
    //   newBasket.splice(index, 1);
    //   setBasket(newBasket);
    //   console.log(basket)
    // };
    
      
  }

    const genRandomPrices = () => {
      let priceArray = []
      for (let i=0; i < limit; i ++)

      { let randomNumber = createRandomCatDetails()

        priceArray.push(randomNumber)
      }
      return priceArray
    }

  
    const priceUpdate = (index) => {
      let tempTotal = total
      tempTotal -= priceArray[index]
      setTotal(tempTotal)
      let newArray = [...priceArray]
      newArray.splice(index, 1); 
      setPriceArray(newArray);
      
    }

    const removeFromBasket = (index) => {
      let newBasket = []
      newBasket = [...basket];
      newBasket.splice(index, 1);
      setBasket(newBasket);
      priceUpdate(index)

    };

  // const generateFakeData = () => {
  //   return {
  //     price: faker.commerce.price(),
  //     location: faker.address.city(),
  //     // keep adding more informaiton from library if needed.
  //   };
  // };

  // const calculateTotalPrice = () => {
  //   return basket.reduce((total, item) => total + item.price, 0);
  // };

  // const toggleBasket = () => {
  //   setIsBasketOpen(!isBasketOpen);
  // };

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
          <p className="total">Total: {Math.round(total)}$</p>
          <p className="total">Basket: {basket.length}</p>

          {/* <Search search={handleSearch} /> */}
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