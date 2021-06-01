import React, { useState} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './PaymentModal.css';
import isEmail from "validator/lib/isEmail";
import axios from '../mainpages/utils/axios'//"./components/mainpages/utils/axios.js";
//import DetailProduct from '../mainpages/detailProduct/DetailProduct';

const PaymentModal = (props) => {
 const {state}=props.location 
 console.log(state)

  const [paymentData, setPaymentData] = useState({
    sandbox: true,
    merchant_id: '1216780',
    return_url: 'http://localhost:3000/return',
    cancel_url: 'http://localhost:3000/cancel',
    notify_url: 'http://localhost:3000/notify',
    order_id: state._id,
    items: state.title,
    amount: state.price,
    currency: "LKR",
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: "Sri Lanka"

  })
  const [error, setError] = useState('');
  console.log(paymentData)

  const onChangeHandler = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  }


  //Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    
    axios
        .post('api/payment', {
          first_name:paymentData.first_name,
          last_name:paymentData.last_name,
          address:paymentData.address,
          email:paymentData.email,
          phone:paymentData.phone,
          city:paymentData.city,
          country:paymentData.country,
          order_id:paymentData.order_id,
          items:paymentData.items,
          currency:paymentData.currency,
          amount:paymentData.amount,

        })
        .then((response) => {
          console.log("response called")
          console.log(response);
         

        })
        .catch((err) => console.log(err));
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  
  

  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (paymentData.first_name === '' || paymentData.last_name === '') {
      setError('First name and last name should be provided.');
    } else if (paymentData.address === '') {
      setError('Address should be provided.');
    // }else if (!isEmail(email)){
    //   setError('Invalid Email');
    } else if (paymentData.phone === '') {
      setError('Phone number should be provided.');
    } else if (paymentData.order_id === '') {
      setError('Order ID should be provided.');
    } else if (paymentData.amount === '') {
      setError('Amount should be provided.');
    } else if (paymentData.items === '') {
      setError('Property item should be provided.');
    } else if (paymentData.propertyitem === '') {
      setError('Property item ID should be provided.');
    } else {
      setError('');
      window.payhere.startPayment(paymentData);
    }
   

    };
  
  return (
    
      <div className="wrapper">
        <div className="form-wrapper">
                    
        <h1>Payment Details Submit Form</h1>
        <br />
        <Form onSubmit={onSubmitHandler}>
        {/* <Form.Group as={Row} controlId="formHorizontaluserid"> */}
        <div className="firstname">
        <label htmlFor="firstname">
            First Name :
          </label>
          
            <input
              type="firstname"
              placeholder="First Name"
              
              id="firstname" name="first_name"
              value={paymentData.firstname}
              onChange={onChangeHandler}
            />

            {/* {this.state.first_nameError ?(
              <div style={{fontSize:14,color:"red"}}>
                {this.state.first_nameError}
                </div>
            ) : null} */}


            
          
          </div>
          <br />

          


          <div className="lastname">
        <label htmlFor="lastname">
            Last Name :
          </label>
          
            <input
              type="lastname"
              placeholder="Last Name"
              id="lname" name="last_name"
              value={paymentData.lastname}
              onChange={onChangeHandler}

            />


          </div>
          <br />

          <div className="address">
          <label htmlFor="address">
             Address :
         </label>
          
            <input
              type="address"
              placeholder="Address"
              id="address" name="address"
              value={paymentData.address}
              onChange={onChangeHandler}
            />
          </div>
          <br />




          <div className="email">
          <label htmlFor="email">
            Email Address :
         </label>
          
            <input
              type="email"
              placeholder="Email"
              id="eaddress" name="email"
              value={paymentData.email}
              onChange={onChangeHandler}
            />
          </div>
          <br />

          <div className="phone">
          <label htmlFor="phone">
            Telephone Number :
          </label>
         
            <input
              type="telnumber"
              placeholder="Telephone Number"
              id="telno" name="phone"
              value={paymentData.phone}
              onChange={onChangeHandler}

              

            />
            {/* {this.state.phoneError ?(
              <div style={{fontSize:14,color:"red"}}>
                {this.state.phoneError}
                </div>
            ) : null} */}
          </div>
          <br />

          <div className="city">
          <label htmlFor="city">
            City :
            
          </label>
          
            <input
              type="city"
              placeholder="City"
              id="City" name="city"
              value={paymentData.city}
              onChange={onChangeHandler}

            />
          </div>
          <br />

          <div className="country">
          <label htmlFor="country">
            Country :
          </label>
          
            <input
              type="country"
              placeholder="Country"
              id="country" name="country"

              
              value={paymentData.country}
              onChange={onChangeHandler}

            />
            {/* <select>
              <option value="Select">Sri Lanka</option>
              </select> */}
          </div>
          <br />

          











          <div className="orderid">
          <label htmlFor="orderid">
          {/* {detailProduct.price} */}
            Property ID :
          </label>
          
            <input
            
              type="orderid"
              placeholder="Order ID"
              id="orderid" name="order_id"
              value={paymentData.order_id}
              disabled
              onChange={onChangeHandler}

            />
            
          </div>
          <br />



          <div className="propertyitem">
          <label htmlFor="propertyitem">
            Property Item :
          </label>
          
            <input
              type="propertyitem"
              placeholder="Property Item"
              id="propertyitem" name="items"
              value={paymentData.items}
              disabled
              onChange={onChangeHandler}

            />
            
          </div>
          <br />


          <div className="currency">
          <label htmlFor="currency">
            Currency :
          </label>
          
            <input
              type="currency"
              placeholder="LKR"
              id="currency" name="currency"
              value={paymentData.currency}
              onChange={onChangeHandler}

            />
          </div>
          <br />



          <div className="amount">
          <label htmlFor="amount">
            Amount :
          </label>
          
            <input
              type="amount"
              placeholder="Amount"
              id="amount" name="amount"
              value={paymentData.amount}
              disabled
              onChange={onChangeHandler}

            />
            </div>

          <Form.Group as={Row}>
            <Col sm={{ span: 6, offset: 3 }}>
              <div className="text-warning" style={{fontSize:18,color:"red",fontWeight:'bold'}}>{error}</div>
              <br /><br />
              <button type="submit"><img src="https://www.payhere.lk/downloads/images/payhere_card_banner_dark.png" alt="PayHere" width="300" /></button>
            </Col>
          </Form.Group>
        </Form>
      </div>

      </div>
      
    
  );
}


export default PaymentModal;