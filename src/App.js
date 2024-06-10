
import './App.css';
import { Routes, Route, Outlet, Link, BrowserRouter as Router } from "react-router-dom";

import Isporuka from './pages/Isporuka';
import KategorijaProizvoda from './pages/KategorijaProizvoda';
import Proizvodi from './pages/Proizvodi';
import SastojakProizvoda from './pages/SastojakProizvoda';
import Sastojci from './pages/Sastojci';
import Placanje from './pages/Placanje';
import Porudzbina from './pages/Porudzbina';
import About from './pages/About';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profil from './pages/Profil'
import DodajProizvod from './pages/DodajProizvod';
import IzmeniProizvod from './pages/IzmeniProizvod';
import Search from './pages/Search';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/kategorije" element={<KategorijaProizvoda />}/>
            <Route path="/proizvodi" element={<Proizvodi />}/>
            <Route path="/porudzbina" element={<Porudzbina />}/>
            <Route path="/isporuka" element={<Isporuka />}/>
            <Route path="/placanje" element={<Placanje />}/>
            <Route path="/sastojci" element={<Sastojci />}/>
            <Route path="/sastojakProizvoda" element={<SastojakProizvoda />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/registration" element={<Registration />}/>
            <Route path="/profil" element={<Profil />}/>
            <Route path="/dodaj" element={<DodajProizvod />}/>
            <Route path="/izmeni" element={<IzmeniProizvod />}/>
            <Route path="/search" element={<Search />}/>
            
           </Routes>
        </Router>
  );

}

export default App;
