import {useEffect, useState} from "react";
import {getKategorije} from '../services/KategorijaServis';

const KategorijaProizvoda = () => {

  const [data,setData] = useState([])


  useEffect(() => {
    getKategorije().then(response => {
      console.log(response)

      setData(response || [])
    })
  }, [])

  const renderKategorijaProizvoda = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.id}</td>
        <td>{item.nazivKategorije}</td>
      </tr>)
    }

    return result
  }

    return <div>
        <h1>Kategorije Proizvoda</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID kategorije</th>
      <th scope="col">Naziv kategorija</th>

    </tr>
  </thead>
  <tbody>
   {renderKategorijaProizvoda()}
  </tbody>
</table>

    </div>
}


export default KategorijaProizvoda