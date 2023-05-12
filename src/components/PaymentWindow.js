

import React, { useEffect, useState } from 'react'
import GooglePayButton from '@google-pay/button-react';
import axios from 'axios'
// import { Navigate } from 'react-router-dom';

const PaymentWindow = () => {
    const [subscription, setSubscription] = useState("");
    const [refcode, setRefcode] = useState("");
    const [merchantId, setMerchantId] = useState("");
    // const [newTransactionId, setNewTransactionId] = useState("")

    const handleSelect = (e) => {
        setSubscription(e.target.value);
    };
    const handleRef = (e) => {
        setRefcode(e.target.value);
    };
    const getmid = async () => {
        const { data } = await axios.get('http://localhost:8080/api/getmerchantid')
        setMerchantId(data.mid)
    }
    const checkoutHandler = async (subscription, refcode) => {
        const { data: { key } } = await axios.get('http://localhost:8080/api/getkey')
        const { data: { order } } = await axios.post("http://localhost:8080/api/checkout", {
            amount: subscription
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


    useEffect(() => {
        getmid();
        // eslint-disable-next-line
    }, [])



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
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-dark" onClick={() => { checkoutHandler(subscription, refcode) }} >Subscribe using Razorpay</button>

                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'acquired',
                                                gatewayMerchantId: merchantId,
                                            },
                                        },
                                    },                                 
                                ],
                                merchantInfo: {
                                    merchantId: merchantId,
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: subscription,
                                    currencyCode: 'INR',
                                    countryCode: 'IN',
                                },
                                emailRequired: true,
                                callbackIntents: ['PAYMENT_AUTHORIZATION']

                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                            onPaymentAuthorized={paymentData => {

                                const transactionId = paymentData.paymentMethodData.tokenizationData.token;
                                const obj = JSON.stringify(transactionId)
                                const OrderId = obj.substring(100, 113)
                                axios.post("http://localhost:8080/api/googletransaction", {
                                    OrderId: OrderId,
                                    TransactionId: transactionId
                                }).then(() => {

                                    window.location.href = `/paymentsuccess/${OrderId}`;
                                })
                            }}
                            existingPaymentMethodRequired='false'
                            buttoncolor='DARK'
                            buttonTypes='SUBSCRIBE'
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PaymentWindow;


