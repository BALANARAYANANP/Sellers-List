 README.md

# Seller Management Application

This project is a **Seller Management Application** built using React.js. It includes a login page, a seller list page, and a form for adding or editing seller details. The application demonstrates basic concepts of React, such as component-based architecture, state management, and routing.

---

## Features

1. **Login Functionality**:
   - A secure login page with validation.
   - Hardcoded credentials for demonstration:
     - User ID: `admin`
     - Password: `password123`
   - Redirects to the seller page upon successful login.

2. **Seller Page**:
   - Displays a list of sellers in a tabular format.
   - Options to add a new seller or edit an existing seller's details.

3. **Add/Edit Seller**:
   - A shared form for adding new sellers and editing existing ones.
   - When editing, the  alert box with the selected seller's details.

4. **Routing**:
   - Navigates between the login page and the seller page using `react-router-dom`.

5. **Dynamic UI Updates**:
   - Reflects changes (e.g., adding or updating sellers) dynamically without page refresh.


---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/seller-management.git
   ```

2. Navigate to the project directory:
   ```bash
   cd seller-management
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   - Navigate to `http://localhost:3000`.

---

## Usage Instructions

### 1. Login
- Enter the User ID and Password as mentioned above.
- On successful login, you will be redirected to the Seller page.

### 2. Seller Page
- **View Sellers**: Displays the list of sellers in a table.
- **Edit Seller**: Click the "Edit" button next to a seller to edit their details.
- **Add Seller**: Click the "Add Seller" button to add a new seller.
- **Delete Seller**: Click the delete button to delete seller

### 3. Add/Edit Seller Form
- Fill in the name, age, and location fields.
- Click "Submit" to save changes or "Cancel" to exit.

---

## Key Concepts Demonstrated

1. **React Components**:
   - Reusable components like `Login`, `Seller`, and `AddSeller`.

2. **State Management**:
   - Use of `useState` for handling local component state.

3. **Routing**:
   - `react-router-dom` for navigation between pages.

4. **Conditional Rendering**:
   - Display the form dynamically for adding or editing sellers.

5. **Event Handling**:
   - Handling button clicks and form submissions.

---

## Future Improvements

- **Authentication**:
  - Implement real backend-based authentication instead of hardcoded credentials.
- **Database Integration**:
  - Store seller data in a database (e.g. MongoDB) instead of hardcoding it.
- **Responsive Design**:
  - Improve the UI to ensure compatibility with all device sizes.
- **Validation**:
  - Add more robust input validation for seller details.

---

## Dependencies

- **React.js**: Frontend library for building user interfaces.
- **React Router DOM**: For managing routing and navigation.


