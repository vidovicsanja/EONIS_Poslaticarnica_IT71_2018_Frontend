import {useEffect, useState} from "react";
import { getSastojci } from "../services/SastojciService";

const Sastojci=()=>{


  const [data,setData] = useState([])

  useEffect(() =>{
    fetchData(1, 5)
  }, [])

  const fetchData = (page, perPage) => {
    getSastojci(page, perPage).then(response => {
      setData(response || [])
    })
  }


  const renderSastojci = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.id}</td>
        <td>{item.nazivSastojka}</td>
        <td>{item.alergen}</td>

      </tr>)
    }

    return result
  }

    return <div>
        <h1>Sastojci</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID sastojka</th>
      <th scope="col">Naziv sastojka</th>
      <th scope="col">Alergeni</th>
    </tr>
  </thead>
  <tbody>
   {renderSastojci()}
  </tbody>
</table>

<button onClick={() => fetchData(1, 5)}>
  1
</button>

<button onClick={() => fetchData(2, 5)}>
  2
</button>

<button onClick={() => fetchData(3, 5)}>
  3
</button>

<button onClick={() => fetchData(4, 5)}>
  4
</button>

<button onClick={() => fetchData(5, 5)}>
  5
</button>

    </div>
}

export default Sastojci