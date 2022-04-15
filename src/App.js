import React from 'react';
import LinkForm from './components/LinkForm'
import Link from './components/Links'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container p-4">
      <Link/>
      <ToastContainer/>
    </div>
    
  );
}

export default App;