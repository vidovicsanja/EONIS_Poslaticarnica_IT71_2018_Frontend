import {useEffect, useState} from "react";
import { getProizvodi, onClick} from "../services/ProizvodiServis";


const Proizvodi=()=>{

  const [data,setData] = useState([])

  const[nazivProizvoda, updateSort]=useState([])



  useEffect(() => {
    fetchData(1, 5)
  }, [])

  const fetchData = (page, perPage, sort, direction) => {
    getProizvodi(page, perPage, sort, direction).then(response => {
      setData(response || [])
    })
  }

  const renderProizvodi = () => {

    let result = []

    for(let item of data) {
      result.push(<tr>
        <td>{item.id}</td>
        <td>{item.nazivProizvoda}</td>
        <td>{item.cena}</td>
        <td>{item.opis}</td>
        <td>{item.idkp}</td>

      </tr>)
    }
    return result
  }
    return <div>
        <h1>Proizvodi</h1>
        <form className="form">
        <label htmlFor="sort">Sortiraj po  </label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={nazivProizvoda}
          onChange={updateSort}
        >
          <option value="name-a">Naziv proizvoda(a-z)</option>
          <option value="name-z">Naziv proizvoda(z-a)</option>
        </select>
      </form>
        <table class="table">
        
      <thead>
    <tr>
      <th scope="col">ID proizvoda</th>
      <th scope="col">Naziv proizvoda</th>
      <th scope="col">Cena proizvoda</th>
      <th scope="col">Opis proizvoda</th>
      <th scope="col">ID kategorije proizvoda</th>
      
    </tr>
  </thead>
  <tbody>
   {renderProizvodi()}
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

export default Proizvodi

