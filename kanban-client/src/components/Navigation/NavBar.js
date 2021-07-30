import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Modals from '../Modal/Modals';
import AddCard from '../Form/AddCard';
const Header = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar
      bg='dark'
      variant='dark'
      style={{ height: '50px', borderRadius: '4px' }}
    >
      <Container>
        <Navbar.Brand href='#home'>Kanban Board</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Button
              onClick={() => setModalShow(true)}
              variant='outline-warning'
              style={{ fontSize: '16px', padding: '1px 7px' }}
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
  );
};

export default Header;
