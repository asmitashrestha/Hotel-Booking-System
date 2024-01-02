// import { Routes } from "react-router-dom"
import { Routes ,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Footer from "./components/Footer"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <div className=''>
      <Header/>

      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/signin'  element={<SignIn/>}/>
        <Route path='/signup'  element={<Signup/>}/>
      </Routes>
     <Footer/>
    </div>
  )
}

export default App
