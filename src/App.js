import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import PaymentHome from './components/PaymentHome';
import PaymentWindow from './components/PaymentWindow';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PaymentHome />} />
        <Route exact path="/paymentwindow" element={<PaymentWindow/>} />
        <Route exact path="/paymentsuccess/:orderId"  element={<PaymentSuccess/>}/>
      </Routes>
    </Router>
  );
}

export default App;
