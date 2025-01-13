import React, { useState, useEffect } from 'react';
import './App.css'; // Optional for additional global styles
import axios from 'axios';
// import Login from './Login';

const Seller = () => {
  

  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSeller, setNewSeller] = useState({
    name: '',
    rating: '',
    review: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch sellers from backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sellers');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchSellers();
  }, []);

  // Filter sellers based on search term
  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

const handleDelete = async (id) => {
  // Show a confirmation dialog to the user
  const confirmDelete = window.confirm('Are you sure you want to delete this seller?');

  if (confirmDelete) {
    try {
      // Make a DELETE request to the backend to remove the seller
      await axios.delete(`http://localhost:5000/api/sellers/${id}`);
      
      // Remove the deleted seller from the list in the state
      setSellers(sellers.filter((seller) => seller._id !== id)); 
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  } else {
    console.log('Deletion cancelled');
  }
};


  // Handle Edit Seller (open a prompt for simplicity)
  const handleEdit = async (id) => {
    
    const newName = prompt('Enter new seller name:');
    const newRating = prompt('Enter new rating:');
    const newReview = prompt('Enter new review:');

    if (newName && newRating && newReview) {
      const updatedSeller = {
        name: newName,
        rating: newRating,
        review: newReview,
      };

      try {
        await axios.put(`http://localhost:5000/api/sellers/${id}`, updatedSeller);
        setSellers(sellers.map((seller) =>
          seller._id === id ? { ...seller, ...updatedSeller } : seller
        ));
      } catch (error) {
        console.error('Error updating seller:', error);
      }
    }
  };

  // Handle Add Seller Form
  const handleAddSellerChange = (e) => {
    const { name, value } = e.target;
    setNewSeller({
      ...newSeller,
      [name]: value,
    });
  };

  const handleAddSellerSubmit = async (e) => {
    e.preventDefault();

    if (!newSeller.name || !newSeller.rating || !newSeller.review) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/sellers', newSeller);
      setSellers([...sellers, response.data]); // Add new seller to the state
      setNewSeller({
        name: '',
        rating: '',
        review: '',
      }); // Reset form
      setShowAddForm(false); // Close the form
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Seller Directory</h1>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Home</li>
            <li style={styles.navItem}>About</li>
            <li style={styles.navItem}>Contact</li>
          </ul>
        </nav>
      </header>

      {/* Search Box */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for sellers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Add Seller Button */}
      <div style={styles.addSellerContainer}>
        <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addSellerButton}>
          {showAddForm ? 'Cancel' : 'Add Seller'}
        </button>
      </div>

      {/* Add Seller Form */}
      {showAddForm && (
        <form onSubmit={handleAddSellerSubmit} style={styles.addForm}>
          <input
            type="text"
            name="name"
            value={newSeller.name}
            onChange={handleAddSellerChange}
            placeholder="Seller Name"
            style={styles.inputField}
          />
          <input
            type="number"
            name="rating"
            value={newSeller.rating}
            onChange={handleAddSellerChange}
            placeholder="Rating (1-5)"
            style={styles.inputField}
          />
          <textarea
            name="review"
            value={newSeller.review}
            onChange={handleAddSellerChange}
            placeholder="Review"
            style={styles.inputField}
          />
          <button type="submit" style={styles.submitButton}>Add Seller</button>
        </form>
      )}

      {/* Seller List */}
      <div style={styles.sellerList}>
        {filteredSellers.length > 0 ? (
          <ul style={styles.sellerUl}>
            {filteredSellers.map((seller) => (
              <li key={seller._id} style={styles.sellerCard}>
                <h3 style={styles.sellerName}>{seller.name}</h3>
                <p style={styles.sellerRating}>⭐ Rating: {seller.rating} / 5</p>
                <p style={styles.sellerReview}>{seller.review}</p>

                {/* Edit and Delete Buttons */}
                <div style={styles.buttonContainer}>
                  <button onClick={() => handleEdit(seller._id)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(seller._id)} style={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noSellers}>No sellers found.</p>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Seller Directory. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: '20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#4CAF50',
  },
  nav: {
    marginTop: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: 0,
  },
  navItem: {
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  searchBox: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  searchInput: {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  addSellerContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  addSellerButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  addForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  inputField: {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sellerList: {
    marginBottom: '20px',
  },
  sellerUl: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  sellerCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sellerName: {
    fontSize: '1.5rem',
    color: '#333',
  },
  sellerRating: {
    fontSize: '1.2rem',
    color: '#FF5733',
  },
  sellerReview: {
    fontSize: '1rem',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noSellers: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f1f1f1',
    fontSize: '0.9rem',
    color: '#333',
  },
};




export default Seller







