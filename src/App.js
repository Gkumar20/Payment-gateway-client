import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import PaymentHome from './components/PaymentHome';
import PaymentSuccess from './components/PaymentSuccess';
import RazorpayWindow from './components/RazorPay/RazorpayWindow';
import  GooglepayWindow   from './components/GooglePay/GooglepayWindow';
import PaymentWindow from './components/PaymentWindow';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PaymentHome />} />
        <Route exact path="/razorwindow" element={<RazorpayWindow/>} />
        <Route exact path="/googlewindow" element={<GooglepayWindow/>} />
        <Route exact path="/paymentwindow" element={<PaymentWindow/>} />
        <Route exact path="/paymentsuccess/:orderId"  element={<PaymentSuccess/>}/>
      </Routes>
    </Router>
  );
}

export default App;
