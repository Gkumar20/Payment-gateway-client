import React from 'react'
import { Link } from 'react-router-dom'


const PaymentHome = () => {
    return (
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="card p-5">
                <h1 class="text-center mb-4">Welcome to Payment</h1>
                <p class="text-center mb-4">Make secure and convenient payments for your purchases.</p>
                <div class="row">
                    <div class="col-md-6">
                        <h2 class="font-weight-bold mb-4">Payment Rules:</h2>
                        <ul class="list-unstyled">
                            <li>Payment must be made within 24 hours of purchase.</li>
                            <li>Refunds are subject to the terms and conditions.</li>
                        </ul>
                    </div>
                    <div class="col-md-6 mt-4 mt-md-0">
                        <h2 class="font-weight-bold mb-4">Subscription:</h2>
                        <p class="mb-1">Subscription is available for:</p>
                        <ul class="list-unstyled">
                            <li>6 months: Rs 3000</li>
                            <li>1 year: Rs 6000</li>
                        </ul>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <div className="half-window">
                        <h1>Welcome to my app!</h1>
                        <Link to="/razorwindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe using RazorPay</button></Link>
                        <Link to="/googlewindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe using GooglePay</button></Link>
                        <Link to="/paymentwindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe</button></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PaymentHome