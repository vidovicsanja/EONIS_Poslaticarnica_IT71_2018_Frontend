import {useState} from "react"

const Isporuka=()=>{

  const [data,setData] = useState([])

  const renderIsporuka = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.ID}</td>
        <td>{item.DatumVremeIsporuke}</td>


      </tr>)
    }

    return result
  }

    return <div>
        <h1>Isporuka</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID isporuke</th>
      <th scope="col">Datum i vreme isporuke</th>

    </tr>
  </thead>
  <tbody>
   {renderIsporuka()}
  </tbody>
</table>

    </div>
}

export default Isporuka