import Sidebar from './Components/Side-bar'
import './App.css'
import Mainarea from './Components/mainarea'

function App() {
    return (
        <div className='flex flex-row'>
            <Sidebar/>
            <Mainarea/>
        </div>
    )
}

export default App