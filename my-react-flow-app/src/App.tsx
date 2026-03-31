import '@xyflow/react/dist/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateWorkFlow from './components/CreateWorkFlow';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<CreateWorkFlow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}