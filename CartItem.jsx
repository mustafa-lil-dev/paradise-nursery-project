import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.cost.replace('$','')) * item.quantity), 0);
  };

  return (
    <div style={{padding:'20px'}}>
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div key={item.name} style={{borderBottom:'1px solid #eee', padding:'10px', display:'flex', alignItems:'center'}}>
          <img src={item.image} alt={item.name} style={{width:'50px', marginRight:'20px'}} />
          <div style={{flexGrow:1}}>
            {item.name} - {item.cost}
            <div>
                <button onClick={() => dispatch(updateQuantity({name:item.name, quantity: Math.max(0, item.quantity - 1)}))}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => dispatch(updateQuantity({name:item.name, quantity: item.quantity + 1}))}>+</button>
            </div>
            <p>Subtotal: ${parseFloat(item.cost.replace('$','')) * item.quantity}</p>
          </div>
          <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
        </div>
      ))}
      <div style={{marginTop:'20px'}}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
