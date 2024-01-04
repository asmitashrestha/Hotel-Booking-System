import { Routes ,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import { AppContextProvider } from "./contexts/AppContext"

const App = () => {
  return (
    <div className=''>
      <AppContextProvider>
         <Header/>
      </AppContextProvider>
     

      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/signin'  element={<SignIn/>}/>
        <Route path='/register'  element={<Register/>}/>
      </Routes>
     <Footer/>
    </div>
  )
}

export default App
