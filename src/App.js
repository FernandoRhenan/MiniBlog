import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth';

// context
import { AuthProvider } from './context/AuthContex';
import { useAuthentication } from './hooks/useAuthentication';

// hooks
import {useState, useEffect} from 'react'

import Home from './pages/home/Home'
import About from './pages/about/About'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import CreatePost from './pages/createPost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import EditPost from './pages/editPost/EditPost'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />

              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='/login' />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/register' />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/register' />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
