//default imports
import './App.css';

//needed for react-navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//imported components
import Pokédex from './components/Pokédex';
import Encounter from './components/Encounter';
import PCBox from './components/PCBox';
import TrainerProfile from './components/TrainerProfile';
import ViewAllTrainers from './components/ViewAllTrainers';
import EditTrainer from './components/EditTrainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="justify-content-center, flex-column, text-center">
              <Navbar.Brand style={{ color: 'white' }}>Pokemon Project</Navbar.Brand>
              <NavDropdown title="Pokemon section">
                <NavDropdown.Item href="/">pokédex</NavDropdown.Item>
                <NavDropdown.Item href="/encounter">encounter</NavDropdown.Item>
                <NavDropdown.Item href="/pc">PC</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Trainer Profiles section">
                <NavDropdown.Item href="/addTrainer">Trainer Profile</NavDropdown.Item>
                <NavDropdown.Item href="/viewAllTrainers">View All Trainers</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/addTrainer' element={<TrainerProfile></TrainerProfile>}></Route>
          <Route path='/viewAllTrainers' element={<ViewAllTrainers></ViewAllTrainers>}></Route>
          <Route path='/' element={<Pokédex></Pokédex>}></Route>
          <Route path='/encounter' element={<Encounter></Encounter>}></Route>
          <Route path='/pc' element={<PCBox></PCBox>}></Route>
          <Route path='/EditTrainer/:id' element={<EditTrainer></EditTrainer>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
