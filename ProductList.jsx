import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const plantsArray = [
    { category: "Air Purifying", plants: [
      { name: "Snake Plant", cost: "$15", image: "https://bit.ly/3Xv1" }, { name: "Spider Plant", cost: "$12", image: "https://bit.ly/3Xv2" },
      { name: "Peace Lily", cost: "$18", image: "https://bit.ly/3Xv3" }, { name: "Aloe Vera", cost: "$10", image: "https://bit.ly/3Xv4" },
      { name: "Boston Fern", cost: "$22", image: "https://bit.ly/3Xv5" }, { name: "Rubber Plant", cost: "$20", image: "https://bit.ly/3Xv6" }
    ]},
    { category: "Aromatic", plants: [
      { name: "Lavender", cost: "$15", image: "https://bit.ly/3Xv7" }, { name: "Rosemary", cost: "$12", image: "https://bit.ly/3Xv8" },
      { name: "Mint", cost: "$10", image: "https://bit.ly/3Xv9" }, { name: "Lemon Balm", cost: "$14", image: "https://bit.ly/3Xv10" },
      { name: "Jasmine", cost: "$25", image: "https://bit.ly/3Xv11" }, { name: "Eucalyptus", cost: "$18", image: "https://bit.ly/3Xv12" }
    ]},
    { category: "Low Maintenance", plants: [
      { name: "ZZ Plant", cost: "$25", image: "https://bit.ly/3Xv13" }, { name: "Pothos", cost: "$15", image: "https://bit.ly/3Xv14" },
      { name: "Cast Iron Plant", cost: "$28", image: "https://bit.ly/3Xv15" }, { name: "Jade Plant", cost: "$12", image: "https://bit.ly/3Xv16" },
      { name: "Succulent Mix", cost: "$10", image: "https://bit.ly/3Xv17" }, { name: "Dracaena", cost: "$22", image: "https://bit.ly/3Xv18" }
    ]}
  ];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav style={{display:'flex', justifyContent:'space-between', padding:'20px', backgroundColor:'#4CAF50', color:'white'}}>
        <div onClick={() => setShowCart(false)} style={{cursor:'pointer'}}>Paradise Nursery</div>
        <div onClick={() => setShowCart(true)} style={{cursor:'pointer'}}>Cart ({totalItems})</div>
      </nav>
      {showCart ? <CartItem onContinueShopping={() => setShowCart(false)} /> : (
        <div>
          {plantsArray.map(cat => (
            <div key={cat.category}>
              <h1>{cat.category}</h1>
              <div style={{display:'flex', flexWrap:'wrap'}}>
                {cat.plants.map(plant => (
                  <div key={plant.name} style={{border:'1px solid #ccc', margin:'10px', padding:'10px'}}>
                    <img src={plant.image} alt={plant.name} style={{width:'150px'}} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      disabled={cart.some(item => item.name === plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {cart.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
