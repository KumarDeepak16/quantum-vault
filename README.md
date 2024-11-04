# Quantum Vault

Quantum Vault is a personal file storage application designed for secure file management. Built with **React**, **TailwindCSS**, and **Firebase** for authentication and storage, it provides a smooth and responsive user experience. The application utilizes **Framer Motion** for animations and **React Hot Toast** for notifications, ensuring a delightful interface for users. 

## Features

- **Personal File Storage:** Securely upload and manage files for personal use.
- **User Authentication:** Firebase authentication to ensure that only the owner can create login credentials.
- **Responsive Design:** Built with TailwindCSS for a modern, responsive user interface.
- **Smooth Animations:** Enhanced user experience with Framer Motion.
- **Toast Notifications:** Real-time notifications with React Hot Toast for user interactions.

## Technologies Used

- **Frontend:** React, TailwindCSS
- **Backend:** Firebase (for authentication and storage)
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast
- **Deployment:** Netlify

## Screenshots

![Screenshot 2024-11-04 160350](https://github.com/user-attachments/assets/644cef16-8a80-4944-aa2c-aeed60dbb414)
![image](https://github.com/user-attachments/assets/e019a301-487f-467f-bd77-650b4e10ba83)
![Screenshot 2024-11-04 160337](https://github.com/user-attachments/assets/99829408-a6d5-4eaf-8daa-d3825e5eae53)
![Screenshot 2024-11-04 160313](https://github.com/user-attachments/assets/32517c6f-5fcf-4678-bc7f-327c2fc4215f)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/KumarDeepak16/quantum-vault.git
cd quantum-vault
```

### 2. Install Dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of your project and add your Firebase configuration:

```plaintext
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Run the Development Server

To start the application locally, run:

```bash
npm run dev
```

### 5. Deployment

The application is deployed on Netlify. You can access it at:

[Quantum Vault on Netlify](https://quantum-vault.netlify.app)

## Usage

The application is intended for personal use. The owner can create login credentials at Firebase, allowing for secure access to the file storage system.

## Contributing

If you'd like to contribute to Quantum Vault, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify any sections or details to better fit your project or personal preferences!
