import React from 'react'
import { useParams } from 'react-router-dom';


const PaymentSuccess = () => {
  const { orderId } = useParams();

  return (

    <div className="container">
      <div className="row">
        <div className="col text-center mt-5">
          <h1>Payment Successful!</h1>
          <p>Order ID: {orderId}</p>
        </div>
      </div>
      <div className="row">
        <div className="col text-center mt-4">
          <p>Thank you for your purchase.</p>
          <p>Your order has been successfully processed and your payment has been received.</p>
          <p>A confirmation email has been sent to your registered email address.</p>
        </div>
      </div>
      <div className="row">
        <div className="col text-center mt-4">
          <a className="btn btn-primary" href="/">Return to Homepage</a>
        </div>
      </div>
    </div>
  );
};



export default PaymentSuccess