import React, { useState } from "react";
import axios from 'axios'


const PaymentWindow = () => {
    const [subscription, setSubscription] = useState("");
    const [refcode, setRefcode] = useState("");

    const handleSelect = (e) => {
        setSubscription(e.target.value);
    };
    const handleRef = (e) => {
        setRefcode(e.target.value);
    };

    const checkoutHandler = async (subscription,refcode) => {
        const { data: { key } } = await axios.get('http://localhost:8080/api/getkey')
        const { data: { order } } = await axios.post("http://localhost:8080/api/checkout", {
            amount :subscription
        })
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Ganesh Kumar",
            description: "Test Transaction",
            image: "https://img.freepik.com/free-vector/business-avatar-template_23-2147502917.jpg?w=740&t=st=1682516054~exp=1682516654~hmac=1c31674e10ca710370c9a38dceb65684cc94cb5874dc60b23dedc41f98c49ca8",
            order_id: order.id,
            callback_url: "http://localhost:8080/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
    return (
        <div className="container">
            <div className="card w-50 m-auto my-3">
                <div className="card-body">
                    <h5 className="card-title">Choose a subscription:</h5>
                    <div className="form-group my-3">
                        <select
                            className="form-control"
                            id="subscriptionSelect"
                            value={subscription}
                            onChange={handleSelect}
                        >
                            <option value="">Select a subscription</option>
                            <option value="3000">6-month subscription : Rs 3000</option>
                            <option value="6000">1-year subscription : Rs 6000</option>
                        </select>
                    </div>
                    <div className="input-group mb-3 my-3">
                        <input
                            type="text"
                            className="form-control"
                            id="refcode"
                            value={refcode}
                            placeholder="Enter Referal Code"
                            name="refcode"
                            onChange={handleRef}
                        />
                    </div>

                    <button className="btn btn-danger" onClick={()=>{checkoutHandler(subscription,refcode)}} >Subscribe Now</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentWindow;
