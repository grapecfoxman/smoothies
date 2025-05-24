import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <nav>
        <h1>Supagase Smoothies</h1>
        <Link to ='/'>Home</Link>
        <Link to ='/create'>Create New Smoothie</Link>
      </nav>
      <Routes>
        <Route path='/create' element={<Create/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
