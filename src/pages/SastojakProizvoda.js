import {useEffect,useState} from "react";
import { getSastojciProizvoda } from "../services/SastojakProizvodaServis";


const SastojakProizvoda=()=>{

  const [data,setData] = useState([])

  useEffect(() => {
    getSastojciProizvoda().then(response => {
      console.log(response)

      setData(response || [])
    })
  }, [])

  const renderSastojakProizvoda = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.id}</td>
        <td>{item.kolicinaSastojka}</td>
        <td>{item.meraSastojka}</td>
        <td>{item.prid}</td>
        <td>{item.sid}</td>

      </tr>)
    }

    return result
  }

    return <div>
        <h1>Sastojci proizvoda</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID sastojka u proizvodu</th>
      <th scope="col">Kolicina sastojka</th>
      <th scope="col">Mera</th>
      <th scope="col">ID Proizvoda</th>
      <th scope="col">ID sastojka</th>


    </tr>
  </thead>
  <tbody>
   {renderSastojakProizvoda()}
  </tbody>
</table>

    </div>
}

export default SastojakProizvoda