

import React, { useEffect, useState } from 'react'
import GooglePayButton from '@google-pay/button-react';
import axios from 'axios'
// import { Navigate } from 'react-router-dom';

const GooglepayWindow = () => {
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
                                currencyCode: 'USD',
                                countryCode: 'US',
                            },
                            emailRequired: true,
                            callbackIntents: ['PAYMENT_AUTHORIZATION']

                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('load payment data', paymentRequest);
                        }}
                        onPaymentAuthorized={ paymentData => {
                            const transactionId = paymentData.paymentMethodData.tokenizationData.token;
                            axios.post("http://localhost:8080/api/googletransaction", {
                                TransactionId: transactionId
                            }).then(() => {
                                const obj = JSON.stringify(transactionId)
                                const newTransactionId= obj.substring(100, 113)
                            window.location.href = `/paymentsuccess/${newTransactionId}`;
                            })
                            // console.log(newTransactionId)
                        }}
                        existingPaymentMethodRequired='false'
                        buttoncolor='LIGHT'
                        buttonTypes='SUBSCRIBE'
                    />
                </div>
            </div>
        </div>
    )
}

export default GooglepayWindow;


