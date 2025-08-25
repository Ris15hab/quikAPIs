# QuikAPIs

QuikAPIs is a zero-code backend automation platform that allows users to instantly generate fully functional CRUD APIs and manage databases without writing a single line of backend code.
It empowers frontend developers, students, and non-technical users to build complete full-stack applications with ease.

<p align="center"><img width="785" height="426" alt="Snapshot of QuikApis dashboard" src="https://github.com/user-attachments/assets/81e1c967-cf50-4751-9371-80f81fab94ee" /></p>

## 🚀 Features
- Automated CRUD API Generation
  - Define your database schema via a GUI (name, type, required, unique fields).
  - Instantly generate API endpoints (/addData, /getData, /getDataById, /updateDataById, /deleteDataById).
  - Dynamic Universal Controller.
  - No need for separate controllers per model.
  - Routes and schemas are dynamically handled using URL parameters and user tokens.
- Built-in Security
  - 🔑 Email + OTP Verification using Nodemailer
  - 🔒 JWT Authentication for secure API calls
  - 🛡️ Bcrypt Password Hashing to protect user credentials
  - 🔐 AES Encryption for user-specific database protection
- Database Management Dashboard
  - Create, view, edit, delete records via GUI.
  - Drop entire databases if needed.
  - Real-time validation to ensure integrity (required & unique fields enforced).
- Interactive Analytics Dashboard
  - Track API hits, request types (GET, POST, PUT, DELETE), and usage patterns in real-time.

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication & Security: JWT, Bcrypt, Nodemailer, AES (crypto module)

## 📸 Demonstrations

<p align="center"><img width="785" height="426"  alt="Snapshot of registration page" src="https://github.com/user-attachments/assets/721080ee-43ae-4fc6-8665-44f82065e4e0" /></p>
<p align="center"><img width="785" height="426" alt="Snapshot of otp verification page" src="https://github.com/user-attachments/assets/650697c6-b905-492e-9a2b-4a7e98b35e69" /></p>
<!-- <p align="center"><img width="785" height="426" alt="Snapshot of Database Creation" src="https://github.com/user-attachments/assets/427dc37f-f90e-4d75-9ac0-08266e193ed1" /></p>
<p align="center"><img width="785" height="426" alt="Screenshot 2025-08-25 at 2 54 16 PM" src="https://github.com/user-attachments/assets/11585c77-dc6c-4bfc-92de-c78c23b9e34f" /></p> -->

<p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 04 35 PM" src="https://github.com/user-attachments/assets/7c25b7f7-acc3-429e-8352-cea2bd8040ca" /></p>
<p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 05 41 PM" src="https://github.com/user-attachments/assets/db76c944-4e82-4541-a7ed-47cb12cabb08" /></p>
<p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 06 20 PM" src="https://github.com/user-attachments/assets/b63bd5ed-c548-4af5-8ae8-217c922a723d" /></p>
<p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 05 19 PM" src="https://github.com/user-attachments/assets/b7d2140b-a4b9-45ed-9bf7-800dd9a18e24" /></p>
<!-- <p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 05 06 PM" src="https://github.com/user-attachments/assets/09548329-3d51-43f5-ad12-4c666acbefcf" /></p> -->
<p align="center"><img  width="785" height="426" alt="Screenshot 2025-08-25 at 3 07 23 PM" src="https://github.com/user-attachments/assets/6824a364-2524-4173-aef1-a3fbd9f41821" /></p>

## ⚙️ Installation & Setup (Local)
Clone the Repository

```bash
git clone https://github.com/your-username/QuikAPIs.git
cd QuikAPIs
```
Install Dependencies

```bash
npm install
```

Set Environment Variables

Create a .env file in the root with:
```bash
PORT=8800
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Run the Application

```bash
PORT=8800
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Access the platform at:
```bash
http://localhost:8800
```

## 🔗 API Endpoints
