# EpiDetect

EpiDetect is a web application developed using the MERN stack, designed to predict skin diseases from images captured using your web camera. It uses a fine-tuned ResNet50 model for accurate skin disease detection. The application also supports document upload and summarization with a Q&A chat feature, providing comprehensive functionality for users.

## Features

- **User Profile Management**: Users can view and update their profile information.
- **Skin Disease Prediction**: Upload or capture images using the web camera to predict skin diseases.
- **Dashboard**: Access different functionalities from a central dashboard.
- **Blog Creation**: Users can create and manage their blog posts.
- **Contact Form**: Users can send messages through the contact form.
- **Prediction Records**: View and download prediction records in PDF format.

## Screenshots

### User Profile
![User Profile](./path_to_your_image/Screenshot 2024-06-07 175359.png)

### Predict Skin Disease
![Predict Skin Disease](./path_to_your_image/Screenshot 2024-06-07 175417.png)

### Contact Us
![Contact Us](./path_to_your_image/Screenshot 2024-06-07 175530.png)

### Dashboard
![Dashboard](./path_to_your_image/Screenshot 2024-06-07 175542.png)

### Prediction Records
![Prediction Records](./path_to_your_image/Screenshot 2024-06-07 175600.png)

### Create Blog Post
![Create Blog Post](./path_to_your_image/Screenshot 2024-06-07 175612.png)

### Login
![Login](./path_to_your_image/Screenshot 2024-06-07 175638.png)

## Technology Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning**: Python, TensorFlow, Keras (ResNet50 model)
- **Other Tools**: JWT for authentication, multer for file uploads

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- Python
- TensorFlow and Keras

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/fatimaazfar/EpiDetect.git
    ```

2. Navigate to the project directory:
    ```sh
    cd EpiDetect
    ```

3. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

4. Install frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

5. Set up environment variables for backend:
    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:
      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```

6. Run the backend server:
    ```sh
    cd ../backend
    npm start
    ```

7. Run the frontend server:
    ```sh
    cd ../frontend
    npm start
    ```

8. Access the application at `http://localhost:3000`.

## Usage

1. **User Registration and Login**: Register a new account or login with existing credentials.
2. **Profile Management**: View and update your profile information.
3. **Skin Disease Prediction**:
   - Navigate to the `Predict` page.
   - Upload an image or capture one using your web camera.
   - Click on `Predict` to get the prediction results.
4. **Document Upload and Summarization**:
   - Navigate to the `Dashboard`.
   - Use the document upload feature to upload PDF documents.
   - Get summaries and ask questions based on the document content.
5. **Blog Creation**: Navigate to the `Create Blog` page to create and manage your blog posts.
6. **Contact Us**: Use the contact form to send messages.
7. **Prediction Records**: View and download your prediction records in PDF format.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries, please contact Fatima Azfar at fatimaazfar381@gmail.com.
