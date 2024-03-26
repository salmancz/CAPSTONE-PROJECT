import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CartAdditonalFeatures from './CartAdditonalFeatures';
import CartPageFaq from './CartPageFaq';
import GooglePayButton from "@google-pay/button-react";
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Features2 from './Features2';
import { useSelector } from 'react-redux';

const CartTotal = (props) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    let cartItems = useSelector((state) => state.cart.items);
    let cartLen = cartItems.length;

    // Calculate subtotal
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price;
    });

    let shipping = 20;
    let tax = 15;
    let total = subtotal + shipping + tax;

    const handleBuyNow = () => {
        // Navigate to "/display" page with billing information as state
        navigate('/admin', {
            state: {
                subtotal: subtotal,
                shipping: shipping,
                tax: tax,
                total: total,
                items: cartItems
            }
        });
    };

    return (
        <div className='cartTotalMainParent '>

            {cartItems.map((item, index) => (
                <div key={index} className='flex flex-row gap-36 font-semibold text-2xl mt-8 mobTextSize gap6rem'>
                    <p className=' ml-14'> {item.name} </p>
                    <p> ${item.price} </p>
                </div>
            ))}

            <div className='headingHold mobTextSize2 mt-10 fof flex flex-col gap-12 relative ml-16 mr-4 font-medium text-xl'>
                <p> SHIPPING </p>
                <p> INCL, TAX  </p>
            </div>

            <div className='calcHold mobTextSize relative fof flex flex-col gap-12 font-medium text-xl'>
                <p> ${shipping} </p>
                <p> ${tax} </p>
            </div>

            <div className=' relative totLine'>
                <p className=' text-gray-300'> ________________________________________________________ </p>
            </div>

            <div className='ctActualToatal fof text-xl font-medium relative'>
                <p> TOTAL  ${total}</p>
            </div>

            <div className=' relative totLine2'>
                <p className=' text-gray-300'> ________________________________________________________ </p>
            </div>
            <div className='gpayBtnHold flex justify-center'>


<GooglePayButton className='gpayHold' environment='TEST' paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: "CARD",
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA", "AMEX"]
            },

            tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",


                },
            },

        },
    ],
    merchantInfo: {
        merchantId: "17613812255336763067",
        merchantName: "Demo Only"
    },

    transactionInfo: {

        totalPriceStatus: 'FINAL',
        totalPriceLabel: "Total",
        totalPrice: "500",
        currencyCode: "USD",
        countryCode: "US",
    },
}}
    onLoadPaymentData={paymentData => {
        console.log(paymentData.paymentMethodData);
    }}

/>
</div>

            {/* PayPal Button */}
            <div className='paypalHold'>
                <PayPalScriptProvider>
                    <PayPalButtons
                        aria-label='BUY WITH PAYPAL'
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                // Order creation configuration
                            });
                        }}
                        onApprove={(data, actions) => {
                            // Handle payment approval
                            console.log(data);
                            console.log(actions);
                            // handlePaymentSuccess(); // Call handlePaymentSuccess function on successful payment
                        }}
                    />
                </PayPalScriptProvider>
            </div>
            <div className='gpayBtnHold flex justify-center'>
                <button className='gpayHold buynowbutton' onClick={handleBuyNow}>
                    Buy Now
                </button>
            </div>

            {cartLen > 1 ? 
                <div className='mobDisappear'>
                    <p className='relative fof text-2xl text-center top-9'> SECURELY CHECKOUT WITH </p>
                    <CartAdditonalFeatures />
                    {cartLen > 2 ? <Features2 /> : ""}
                </div>
                :
                ""
            }
        </div>
    );
};

export default CartTotal;
