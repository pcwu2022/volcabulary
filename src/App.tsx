import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="App">
      {
        (!login)?<Login />
        :<>
          <div></div>
        </>
      }
    </div>
  );
}

export default App;
