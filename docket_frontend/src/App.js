import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<HomePage/>} path='/'>

        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
