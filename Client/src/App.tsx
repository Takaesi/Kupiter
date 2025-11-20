
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'
import { PrivateLayout } from './layouts/PrivateLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { Main } from './pages/main/Main'
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute'
import { Ads } from './pages/ads/Ads'
import { CreateAd } from './pages/createAd/CreateAd'

function App() {


  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path='/register' element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Route>

      <Route element={<PrivateLayout/>}>

        <Route path="/main" element={<Main/>} />

        <Route
        path='/ads'
        element={
          <ProtectedRoute>
            <Ads/>
          </ProtectedRoute>
        } />

        <Route
        path='/createAd'
        element={
          <ProtectedRoute>
            <CreateAd/>
          </ProtectedRoute>
        }/>

      </Route>

    </Routes>
  )
}

export default App
