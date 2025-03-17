import { Route, Routes } from 'react-router'
import './App.css'
import { Footer, Header } from './components/layout'
import { Home, Jobs, PostJob, JobApplicantDetails, About, Login, Register } from './pages'

//Login, Register

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs/:id" element={<JobApplicantDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
