import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSeller, setNewSeller] = useState({
    name: '',
    rating: '',
    review: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editSeller, setEditSeller] = useState(null);
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

  // Handle Delete Seller
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this seller?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/sellers/${id}`);
        setSellers(sellers.filter((seller) => seller._id !== id));
      } catch (error) {
        console.error('Error deleting seller:', error);
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
      setSellers([...sellers, response.data]);
      setNewSeller({ name: '', rating: '', review: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  // Handle Edit Seller
  const handleEditClick = (seller) => {
    setIsEditing(true);
    setEditSeller(seller);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/sellers/${editSeller._id}`, editSeller);
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === editSeller._id ? editSeller : seller
        )
      );
      setIsEditing(false);
      setEditSeller(null);
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSeller((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Seller Management</h1>

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
  max="5" // This sets the maximum allowed value to 5
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

      {/* Seller List or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Edit Seller</h2>
          <input
            type="text"
            name="name"
            value={editSeller.name}
            onChange={handleInputChange}
            placeholder="Seller Name"
            style={styles.inputField}
            required
          />
          <input
            type="number"
            name="rating"
            value={editSeller.rating}
            onChange={handleInputChange}
            placeholder="Rating"
            style={styles.inputField}
            max="5"
            required
          />
          <input
            type="textarea"
            name="review"
            value={editSeller.review}
            onChange={handleInputChange}
            placeholder="Review"
            style={styles.inputField}
            required
          />
          <div style={{display:"flex", marginTop:"2rem", gap:"2rem"}}>
            <button type="submit" style={styles.editButton}>Update Seller</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={styles.deleteButton}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <ul style={styles.list}>
          {filteredSellers.length > 0 ? (
            filteredSellers.map((seller) => (
              <li key={seller._id} style={styles.listItem}>
                  {/* <div style={{display:"flex"}}> */}
                <div style={styles.sellerDetails}>
                
                  <h2 style={{textAlign:"center"}}>{seller.name}</h2> 
                  <h4>Rating: {seller.rating} </h4> 
                  <h4>Review: {seller.review}</h4>
                </div>
                <div style={{display:"flex", justifyContent:"space-evenly",gap:"3rem"}}>
                <button onClick={() => handleEditClick(seller)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(seller._id)} style={styles.deleteButton}>
                  Delete
                </button></div>
                {/* </div> */}
              </li>
            ))
          ) : (
            <p style={styles.noSellers}>No sellers found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

const styles = {
  // Add styles from the previous components here.
  
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
    title: {
      fontSize: '2.5rem',
      color: '#4CAF50',
      textAlign: 'center',
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
    list: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: 0,
      margin: '20px 0',
      listStyleType: 'none',
    },
    listItem: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    sellerDetails: {
      fontSize: '1rem',
      color: '#333',
      marginBottom: '10px',
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
  };
  

export default Seller;
