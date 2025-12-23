import { useState } from 'react'
import './styles/App.css'
import { PersonProvider } from './contexts/PersonContext'
import LuckyWheel from './components/Luckywheel'
import PersonManager from './components/PersonManager'

function App() {
  const [showWheel, setShowWheel] = useState(false)

  return (
    <PersonProvider>
      <div className="app-header">
        <button 
          className="toggle-button" 
          onClick={() => setShowWheel(!showWheel)}
        >
          {showWheel ? 'Zur Personenliste' : 'Zum Glücksrad'}
        </button>
      </div>
      {showWheel ? <LuckyWheel /> : <PersonManager />}
    </PersonProvider>
  )
}

export default App
