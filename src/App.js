import { useState, useEffect } from 'react'

function App() {
  const [randomMeal, setrandomMeal] = useState([])
  const [input, setInput] = useState()
  const [searchMeal, setSearchMeal] = useState([])
  const [visible, setVisible] = useState(null)

  useEffect(() => {
    sixPlaces()
  }, [])

  async function info() {

    try {
      const responds = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      const result = await responds.json();
      let newMeal = {
        nameOfMeal: result.meals[0].strMeal,
        img: result.meals[0].strMealThumb,
        instruction: result.meals[0].strInstructions
      }
      setrandomMeal((r) => [...r, newMeal])
    }
    catch (error) {
      console.error(error)
    }
  }

  function inputValue(e) {
    setInput(e.target.value)
  }

  async function sixPlaces() {
    let listOfMeal = []
    for (let i = 0; i <= 5; i++) {
      let mealList = await info()
      if (mealList) mealList.push(listOfMeal)
    }
    setrandomMeal((r) => [...r, ...listOfMeal])
  }

  function openRandomMeal(index) {
    setVisible(index)
  }

  async function openSearchedMeal() {
    if (input) {
      try {
        const finding = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const found = await finding.json();
        if (found.meals) {
          let serchedMeal = {
            nameOfMeal: found.meals[0].strMeal,
            img: found.meals[0].strMealThumb,
            instruction: found.meals[0].strInstructions.substring(0, 300)
          }
          console.log(serchedMeal.nameOfMeal)
          setSearchMeal((s) => [...s, serchedMeal])
        } else {
          setInput('')
          document.getElementsByClassName('inputMain')[0].value = ''
          document.getElementsByClassName('inputMain')[0].placeholder = 'No meals'
        }
      }
      catch (error) {
        console.error(error)
      }
    } else {
      document.getElementsByClassName('inputMain')[0].placeholder = 'Enter name of meal'
    }
  }

  return (
    <div className='body'>
      <div className='topControls'>
        <input
          className='inputMain'
          type='text'
          placeholder='Your Meal'
          onChange={inputValue}
          value={input}
        />
        <button
          className='searchButton'
          onClick={() => (searchMeal.length > 0 ? (setSearchMeal([]), openSearchedMeal()) : openSearchedMeal())}
        >
          Search
        </button>
        <button
          className='randomButton'
          onClick={() => (randomMeal.length < 6 ? sixPlaces() : (setrandomMeal([]), sixPlaces()))}
        >
          Random Meal
        </button>
      </div>
      <div className='container'>
        {searchMeal.map((oneMeal) => (
          <div className='singleMealBox' key={oneMeal.nameOfMeal}>
            <button className='newClose' onClick={() => setSearchMeal([])}>Close (X)</button>
            <h1>{oneMeal.nameOfMeal}</h1>
            <img className='singleImg' src={oneMeal.img} alt={oneMeal.nameOfMeal} />
            <p className='reciptText'>{oneMeal.instruction}</p>
          </div>
        ))}
        {randomMeal.map((mealItem, index) => (
          <div
            className={visible === index ? 'imageHolderOpen' : 'imageHolder'}
            key={index}
          >
            <button
              className='randomeClose'
              style={{ visibility: visible === index ? 'visible' : 'hidden' }}
              onClick={() => setVisible(null)}
            >
              Close (X)
            </button>
            <p className='mealText'>{mealItem.nameOfMeal}</p>
            <img
              className='meal'
              src={mealItem.img}
              alt={mealItem.nameOfMeal}
              onClick={() => openRandomMeal(index)}
            />
            <p
              className='randomText'
              style={{ display: visible === index ? 'block' : 'none' }}
            >
              {mealItem.instruction}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App