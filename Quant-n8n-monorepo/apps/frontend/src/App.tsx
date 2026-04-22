/*import '@xyflow/react/dist/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateWorkFlow } from './components/CreateWorkFlow';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-workflow" element={<CreateWorkFlow />} />
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}  */

import '@xyflow/react/dist/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateWorkFlow } from './components/CreateWorkFlow';
import Home from './components/Home'; // Import your Home component
import Signup from './components/Signup';
import Contact from './components/Contact';
import Documentation from './components/Documentation';
import Login from './components/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add the Home route */}
        <Route path="/" element={<Home />} />
        <Route path="/create-workflow" element={<CreateWorkFlow />} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Documentation" element={<Documentation/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}