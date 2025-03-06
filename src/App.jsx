import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <div className="pt-16"> {/* Add padding-top to avoid header overlap */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
