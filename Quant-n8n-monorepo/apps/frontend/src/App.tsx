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
import { ReactFlowProvider } from '@xyflow/react';
import { CreateWorkFlow } from './components/CreateWorkFlow';
import Home from './components/Home'; // Import your Home component
import Signup from './components/Signup';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
//import { ExecutionsPage } from './components/ExecutionsPage'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add the Home route */}
        <Route path="/" element={<Home />} />
        <Route path="/create-workflow" element={<ReactFlowProvider><CreateWorkFlow/></ReactFlowProvider>} />
        <Route path="/workflow/:workflowId" element={<ReactFlowProvider><CreateWorkFlow /></ReactFlowProvider>}/>
        {/* <Route path="/workflow/:workflowId/executions" element={<ExecutionsPage />} />  */}

        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}