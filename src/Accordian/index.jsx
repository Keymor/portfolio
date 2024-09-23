import { useState } from 'react';
import data from './data'

function Accordian() {
  const [multySelect, setMultySelect] = useState(false)
  const [id, setId] = useState()
  const [array, setArray] = useState([])

  function multyselector(arrayId) {
    let copyArray = [...array]
    const indexOfId = copyArray.indexOf(arrayId)

    if(indexOfId === -1){
      copyArray.push(arrayId)
    } else {
      copyArray.splice(indexOfId, 1 )
    }
    setArray(copyArray)
  }

  function singlSelect(arreyId) {
      if(array.some((element) => element >= 0)){
        setArray([])
      }
      setId(arreyId === id ? null : arreyId)
  }
  
  return ( 
    <div className='container1'>
      <button className='button1' onClick={() => setMultySelect(!multySelect)}>Multyselect</button>
      {data.map((dataItem) => (
        <div className='text-block' onClick={multySelect === true ?
          () => multyselector(dataItem.id) :
          () => singlSelect(dataItem.id)
          }>
          <h1>{dataItem.mainText}</h1>
          {id === dataItem.id || array.indexOf(dataItem.id) !== -1 ?
            <div>
              {dataItem.secondText}
            </div>
            : null}
        </div>
      ))}
    </div>
  )
}
export default Accordian