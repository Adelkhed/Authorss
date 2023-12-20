import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './views/Dashboard';
import { AuthorForm } from './components/AuthorForm';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const location = useLocation();
  const [path, setPath] = useState('');
  useEffect(()=>{
    setPath(location.pathname.split('/')[1]);
  },[location])

  return (
    <div className="App">
      <h1>Favorite Authors</h1>
      <h6>{{
        'new': 'Add a new author:',
        'edit': 'Edit this author:'
      }[path] || 'We have quotes by:'}</h6>
      <Link to={path == 'new' ? '/' : '/new'}>{path !== '' ? 'Home' : 'Add an author'}</Link>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/new' element={<AuthorForm />} />
        <Route path='/edit/:id' element={<AuthorForm />} />
      </Routes>
    </div>
  );
}

export default App;
