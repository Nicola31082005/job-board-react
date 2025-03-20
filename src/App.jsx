import { Route, Routes } from 'react-router'
import { useState } from 'react'
import AuthContext from './context/authContext'
import { Footer, Header } from './components/layout'
import { Home, Jobs, PostJob, JobApplicantDetails, About, Login, Register, Profile } from './pages'
import './App.css'
import { JobsProvider } from './context/JobsContext'

function App() {
  const [authData, setAuthData] = useState({});

  const setAuthDataHandler = (authData) => {
    setAuthData(authData);
  }

  const clearAuthData = () => {
    setAuthData({});
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthDataHandler, clearAuthData }}>
      <JobsProvider>
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
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </JobsProvider>
    </AuthContext.Provider>
  )
}

export default App
