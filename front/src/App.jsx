
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Articles from './pages/Articles'
import AddArticle from './pages/AddArticle'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import OneArticle from './pages/OneArticle'
import OneProduct from './pages/OneProduct'
import Login from './pages/Login'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Register from './pages/Register'

function App() {


  return (

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/se-connecter" element={<Login />} />
      <Route path="/inscription" element={<Register />} />

      <Route path='/article/:id' element={<OneArticle />} />
      <Route path="/articles" element={<Articles />} />

      <Route path="/produits" element={<Products />} />
      <Route path="/produit/:id" element={<OneProduct />} />


      {/* Ces pages ne sont  disponibles que pour les admins */}
      <Route path='/' element={<PrivateRoute roles={["admin"]} />}> 
        <Route path="/creer-article" element={<AddArticle />} />
        <Route path="/creer-produit" element={<AddProduct />} />
      </Route>


    </Routes>

  )
}

export default App
