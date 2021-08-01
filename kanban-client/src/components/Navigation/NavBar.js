import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Modals from '../Modal/Modals';
import AddCard from '../Form/AddCard';
import './NavBar.css';
const Header = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className='html'>
      <Navbar variant='dark' style={{ height: '50px', borderRadius: '4px' }}>
        <Container>
          <Navbar.Brand href='/'>
            <p className='logotitle'>K A N B A N &nbsp; &nbsp; B O A R D</p>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              <Button
                onClick={() => setModalShow(true)}
                variant='outline-secondary'
                style={{
                  fontSize: '14px',
                  padding: '1px 7px',
                  fontWeight: 'normal',
                }}
              >
                <i className='bi bi-file-earmark-plus'> Add Card</i>
              </Button>
              <Modals
                components={<AddCard handleClose={() => setModalShow(false)} />}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
