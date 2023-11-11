import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Layout from './comporents/shared/Layout';

import Home from './comporents/pages/Home';
import About from './comporents/pages/About';
import Skill from './comporents/pages/Skill';
import Education from './comporents/pages/Education';
import Project from './comporents/pages/Project';
import Contact from './comporents/pages/Contact';

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route path="/about" element={<About/>}/>
               <Route path="/skill" element={<Skill/>}/>
               <Route path="/education" element={<Education/>}/>
               <Route path="/project" element={<Project/>}/>
               <Route path="/contact" element={<Contact/>}/>
            </Route>
            <Route path="/" element={<Layout/>}></Route>
         </Routes>
      </Router>
   );
}

export default App;
