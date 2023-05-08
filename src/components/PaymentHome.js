import React from 'react'
import { Link } from 'react-router-dom'


const PaymentHome = () => {
    return (
        <div className="container">
            <div className="half-window">
                <h1>Welcome to my app!</h1>
                <Link to="/paymentwindow"><button type="button" className="btn btn-primary">Subscribe</button></Link>
            </div>

        </div>
    )
}

export default PaymentHome