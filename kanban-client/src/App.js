import { Provider } from 'react-redux';
import { store } from './actions/store';
import { Container } from 'react-bootstrap';
import Main from './components/Body/MainBody';
import Header from './components/Navigation/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function App() {
  return (
    <Provider store={store}>
      <Container fluid='md'>
        <Header />
        <Main />
        <ToastContainer />
      </Container>
    </Provider>
  );
}

export default App;
