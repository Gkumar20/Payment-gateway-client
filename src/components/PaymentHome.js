import React from 'react'
import { Link } from 'react-router-dom'


const PaymentHome = () => {
    return (
        <div className="container">
            <div className="half-window">
                <h1>Welcome to my app!</h1>
                <Link to="/razorwindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe using RazorPay</button></Link>
                <Link to="/googlewindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe using GooglePay</button></Link>
                <Link to="/paymentwindow"><button type="button" className="btn btn-primary my-3 mx-3">Subscribe</button></Link>
            </div>
        </div>
    )
}

export default PaymentHome