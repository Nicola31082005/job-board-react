import './App.css'
import { Route, Routes } from 'react-router'
import AuthContext from './context/authContext'
import { JobsProvider } from './context/JobsContext'
import AuthGuard from './components/guards/AuthGuard'
import GuestGuard from './components/guards/GuestGuard'
import { Footer, Header } from './components/layout'
import { Home, Jobs, PostJob, JobApplicantDetails, About, Login, Register, Profile } from './pages'
import { ErrorBoundary } from 'react-error-boundary'
import usePersistedState from './hooks/usePersistedState'
import ErrorFallback from './components/common/ErrorFallback'
import EditApplicant from './pages/EditApplicant'

function App() {
  const [authData, setAuthData] = usePersistedState('auth', {});

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

              <Route element={<AuthGuard />} >
                <Route
                  path="/post-job"
                  element={
                    <ErrorBoundary FallbackComponent={ErrorFallback} >
                      <PostJob />
                    </ErrorBoundary>
                  } />
                <Route path="/profile" element={<Profile />} />
              </Route>


              <Route element={<GuestGuard />} >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobApplicantDetails />} />
              <Route path="/edit-applicant/:id" element={<EditApplicant />} />

            </Routes>
          </main>

          <Footer />
        </div>
      </JobsProvider>
    </AuthContext.Provider>
  )
}

export default App
