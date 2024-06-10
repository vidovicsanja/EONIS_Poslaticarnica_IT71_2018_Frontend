import {useEffect, useState} from "react";
import {getPorudzbina, postPorudzbina} from '../services/PorudzbinaServis';

const Porudzbina=()=>{

  const [data,setData] = useState([])

  useEffect(() => {
    getPorudzbina().then(response => {
      console.log(response)

      setData(response || [])
    })
    
    postPorudzbina().then(response => {
      console.log(response)

      setData(response || [])
    })
  }, [])
  

  const renderPorudzbina = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.ID}</td>
        <td>{item.DatumVremePorudzbine}</td>
        <td>{item.KID}</td>


      </tr>)
    }

    return result
  }

    return <div>
        <h1>Porudzbina</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID porudzbina</th>
      <th scope="col">Datum i vreme porudzbine</th>
      <th scope="col">ID korisnika</th>

    </tr>
  </thead>
  <tbody>
   {renderPorudzbina()}
  </tbody>
</table>

    </div>

}

export default Porudzbina