import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
    );
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");

      // Ensure userEmail is not null or undefined
      if (!userEmail) {
        alert("User email not found. Please log in.");
        console.error("User email not found. Please log in.");
        return; // Stop execution if no email is found
      }

      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        }),
        credentials: 'include', // Allow credentials in the request
      });

      if (response.ok) {
        dispatch({ type: "DROP" }); // Clear the cart on successful checkout
        alert("Checkout successful!");
      } else {
        console.error(`Checkout failed with status: ${response.status} - ${response.statusText}`);
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout. Please try again.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0); // Calculate the total price with quantity

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price * food.qty}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
