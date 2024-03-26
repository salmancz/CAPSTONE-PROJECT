import React from 'react';
import { useLocation } from 'react-router-dom';

function Admin() {
    // Get the location object
    const location = useLocation();

    // Extract billing information from location state
    const { subtotal, shipping, tax, total, items } = location.state || {};

    // Now you can use this billing information in your Admin component
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '500px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>Bill Display Page</h1>
            <div style={{ marginBottom: '20px' }}>
                <h2>Items:</h2>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Subtotal: ${subtotal}</p>
                <p>Shipping: ${shipping}</p>
                <p>Tax: ${tax}</p>
                <p>Total: ${total}</p>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print Bill</button>
            </div>
        </div>
    );
}

export default Admin;
