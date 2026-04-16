import './App.css';
import { useState } from 'react';
import BirthdayWebsite from './BirthdayWebsite';
import Login from './Login';

function App() {
  const [userName, setUserName] = useState(null);

  if (!userName) {
    return <Login onLogin={(n) => setUserName(n)} />;
  }

  return <BirthdayWebsite name={userName} />;
}

export default App;
