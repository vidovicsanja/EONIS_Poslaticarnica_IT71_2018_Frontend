import {useState} from "react"

const Placanje=()=>{


  const [data,setData] = useState([])

  const renderPlacanje = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.id}</td>
        <td>{item.iznos}</td>
        <td>{item.placeno}</td>
        <td>{item.valuta}</td>

      </tr>)
    }

    return result
  }

    return <div>
        <h1>Placanje</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID placanja</th>
      <th scope="col">iznos</th>
      <th scope="col">placeno</th>
      <th scope="col">valuta</th>

    </tr>
  </thead>
  <tbody>
   {renderPlacanje()}
  </tbody>
</table>

    </div>

}

export default Placanje