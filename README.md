
# **🛒 Online Auction Platform**  
A **MERN-based real-time online auction system** that allows users to **post items, bid in real-time, and make secure payments via Stripe**. It features **authentication, WebSockets for live bidding updates, image uploads via Cloudinary, and role-based access control**.

---

## **🚀 Features**
✔ **User Authentication (JWT)** – Secure login & signup with token-based authentication  
✔ **Real-time Bidding (WebSockets)** – Live updates on auction items  
✔ **Post Auctions** – Users can list items with images & descriptions  
✔ **Cloudinary Integration** – Upload and store images securely  
✔ **Secure Payments (Stripe)** – Integrated payment system for transactions  
✔ **Auto-Close Auctions** – Auctions close automatically after the deadline  
✔ **Role-Based Access Control** – Different permissions for Admin, Seller & Bidders  
✔ **Advanced UI** – Responsive, modern, and user-friendly interface  

---

## **📌 Tech Stack**
### **Frontend (React)**
- React.js  
- React Bootstrap (UI)  
- Framer Motion (Animations)  
- WebSockets (Live bidding updates)  

### **Backend (Node.js, Express)**
- Express.js  
- MongoDB (Database)  
- JWT (Authentication)  
- Multer & Cloudinary (Image Uploads)  
- WebSockets (Real-time bidding)  

### **Payments & Security**
- Stripe API (Secure payments)  
- Bcrypt.js (Password encryption)  

---

## **⚙️ Installation Guide**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/auction-platform.git
cd auction-platform
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
```
🔹 **Create `.env` File** in `backend/` & Add:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run the backend:
```sh
npm start
```

---

### **3️⃣ Setup Frontend**
```sh
cd frontend
npm install
```
🔹 **Create `.env` File** in `frontend/` & Add:
```env
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Run the frontend:
```sh
npm start
```

---

## **💳 Payment Integration (Stripe)**
1. Add **Stripe API keys** in `.env`.  
2. When a user wins a bid, they can **checkout using Stripe**.  
3. Stripe securely processes payments & confirms transactions.  

---

## **🔄 API Endpoints**
### **🔐 Authentication**
| Method | Endpoint       | Description           |
|--------|--------------|----------------------|
| POST   | `/signup`    | Register a new user  |
| POST   | `/signin`    | Login & get JWT      |

### **🛍️ Auction Management**
| Method | Endpoint              | Description                |
|--------|----------------------|----------------------------|
| GET    | `/auctions`          | Get all auction items     |
| GET    | `/auctions/:id`      | Get auction details       |
| POST   | `/auction`           | Create a new auction (Auth) |
| POST   | `/bid/:id`           | Place a bid (Auth)        |

### **💳 Payments**
| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| POST   | `/create-checkout-session`   | Create Stripe payment session |

---


---

## **🎯 Future Enhancements**
✔ AI-powered price suggestions  
✔ Admin dashboard for auction monitoring  
✔ Email notifications for bid status  
✔ Multi-currency payment support  

---

## **📜 License**
This project is open-source under the **MIT License**.  

---

## **🤝 Contributing**
Want to contribute? **Fork the repo** and create a pull request!  

---
