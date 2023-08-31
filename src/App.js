
import { BrowserRouter, Routes, Route ,Outlet} from 'react-router-dom'
import Profiles from './Pages/display-profiles';
import React from 'react';
import CreateAnAccount from './Pages/createAccount';
import Login from './Pages/Login'
import Header from './components/Header';
import Footer from './components/Footer';
import MainHomePage from './Pages/MainHomePage';
 
function App() {

  const Layout = () => {
    return (
      <>
    <Header />
    <Outlet />
    <Footer />
    </>
 ) }
  return (
   <div className='App'>
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<CreateAnAccount/>} /> 
          <Route path='/DeBudgieMan' element={<Profiles/>} /> 
          <Route path='/login' element={<Login/>} /> 
          <Route path='/userprofile' element={<MainHomePage/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>

        
  </div>
  );
}

export default App;
