import React from 'react';

const SellerList = ({ sellers }) => (
  <ul>
    {sellers.map((seller) => (
      <li key={seller._id}>
        <h3>{seller.name}</h3>
        <p>Rating: {seller.rating}</p>
        <p>Review: {seller.review}</p>
      </li>
    ))}
  </ul>
);

export default SellerList;
