//default imports
import './App.css';

//needed for react-navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//imported components
import Home from './components/Home';
import Pokédex from './components/Pokédex';
import Encounter from './components/Encounter';
import PCBox from './components/PCBox';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/pokédex">Pokédex</Nav.Link>
              <Nav.Link href="/encounter">Encounter</Nav.Link>
              <Nav.Link href="/PCBox">PC</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/pokédex' element={<Pokédex></Pokédex>}></Route>
          <Route path='/encounter' element={<Encounter></Encounter>}></Route>
          <Route path='/PCBox' element={<PCBox></PCBox>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
