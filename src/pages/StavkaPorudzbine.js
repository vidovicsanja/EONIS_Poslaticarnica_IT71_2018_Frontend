import {useState} from "react"

const Stavka=()=>{

  const [data,setData] = useState([])

  const renderStavka = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.ID}</td>
        <td>{item.Kolicina}</td>
        <td>{item.Mera}</td>
        <td>{item.PID}</td>
        <td>{item.PPID}</td>

      </tr>)
    }

    return result
  }

    return <div>
        <h1>Stavka porudzbine</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID stavke</th>
      <th scope="col">Kolicina</th>
      <th scope="col">Mera</th>
      <th scope="col">ID Proizvoda</th>
      <th scope="col">ID kupca</th>


    </tr>
  </thead>
  <tbody>
   {renderStavka()}
  </tbody>
</table>

</div>
}

export default Stavka