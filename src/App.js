import UserList from './components/UserList';
import './App.css';
import Card from './components/Card';
import Search from './components/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='bg-light'>
      {/* <UserList /> */}
      <Search/>
      </div>
    </>
  );
}

export default App;
