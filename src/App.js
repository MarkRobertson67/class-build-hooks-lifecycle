import { useState, useEffect } from "react";
import axios from "axios";
import days from "./data";
const colors = [
  "papayawhip",
  "blanchedalmond",
  "peachpuff",
  "bisque",
  "cornsilk",
  "lightyellow",
];

function App() {
  const [color, setColor] = useState("lemonchiffon");
  const [dog, setDog] = useState({});
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(0);
  const [today, setToday] = useState({});
  const [vibe, setVibe] = useState("");


// function that does not update state on a component mounting. i.e. page load

// function getData() {
//   console.log("i'm getting data")
// }

useEffect(() => {
  setNumber(Math.floor(Math.random() * 100));
}, [])

useEffect(() => {
  setToday(days[index])
}, [index])


//Multiple useEffects
// seperate as 2 things in 1 useEffect can cause  infinate loop
// Don't do this
  //useEffect(() => {
  //   getSomeValue()
  //   getAnotherValue()
 // }, [SomeValue anotherValue]) 


// Do like this:
// useEffect(() => {
//   getSomeValue()
// }, [SomeValue])

// useEffect(() => {
//   getAnotherValue()
// }, [anotherValue])

//Functionality after state has been updated


  function handleOnChange(event) {
    setVibe(event.target.value);
    // console.log(vibe)
  }

  useEffect(() => {
    console.log(vibe)
  }, [vibe])


  //color changes when month changes
  useEffect(() => {
    setColor(colors[index]);
  },[today.month] )
// today.month because...The onClick for the day change, changes the index state.
// The useEffect we created for the today change, has the [index] dependency.
// So when index’s state changes, our today state changes to the next day.
// Each day is an object, with its own month.
// So we want to watch for when the day.month value changes


// function getFeaturedDog() {
//   fetch(`https://dog.ceo/api/breeds/image/random`)
//   .then((response) => response.json())
//   .then((json) => {
//    setDog(json) 
//   })
//   .catch((err) => {
//     console.log("error fetching image")
//   })
// }

//as above with AXIOS.   (npm i axios)

async function getFeaturedDog() {
  try {
    const response = await axios(`https://dog.ceo/api/breeds/image/random`)
    console.log(response)
    setDog(response.data);
  } catch (e) {
    console.log(e);
  }
}

useEffect(() => {
  getFeaturedDog()
}, [])






  function updateIndex() {
    setIndex((index + 1) % days.length);
  }

  return (
    <div className="App">
      <header style={{ backgroundColor: color }}>
        <h1>Daily Home Page </h1>
        <button onClick={updateIndex}>Update Day</button>
      </header>
      <main>
        <div className="date">
          <h2>Todays date:</h2>
          <h3>{today.weekday}</h3>
          <h4>{today.month}</h4>
          <h5>{today.day}</h5>
        </div>
        <div className="lucky">
          <h2>Today's lucky number is: {number}</h2>
        </div>
        <div className="vibe">
          <input type="text" onChange={handleOnChange} />
          <h4>Today's vibe is: </h4>
          <h5>{vibe}</h5>
        </div>
        <div className="dog">
          <button onClick={getFeaturedDog}>Change dog</button>
          <h2>Featured dog:</h2>
          <img src={dog.message} alt="Featured Dog" />
        </div>
      </main>
    </div>
  );
}

export default App;
