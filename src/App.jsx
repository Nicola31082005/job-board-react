import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Jobs from './components/Jobs'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
