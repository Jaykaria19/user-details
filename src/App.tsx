import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

const App = () => {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </>
  )
}

export default App
