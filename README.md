# 🧭 Wanderlust

A full-stack travel listing web application where users can browse, add, and manage property listings. Built with Node.js, Express, MongoDB, and EJS templating.

---

## 🌐 Live Demo

> Coming soon — deploying on [Render.com](https://render.com)

---

## ✨ Features

- Browse all travel/property listings on the home page
- Add new listings with title, description, price, and image
- View individual listing details
- Flash messages for success and error feedback
- Responsive UI with Bootstrap 5
- Clean, premium design with custom CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating | EJS, ejs-mate |
| Frontend | Bootstrap 5, Font Awesome 7 |
| Fonts | Google Fonts (Playfair Display, DM Sans) |
| Image Storage | Cloudinary |
| Validation | Joi |

---

## 📁 Project Structure

```
DB-Project/
├── models/
│   └── listing.js          # Mongoose schema for listings
├── routes/
│   └── listing.js          # All listing routes
├── views/
│   ├── layout/
│   │   └── boilerplate.ejs # Main HTML layout
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar
│   │   ├── flash.ejs       # Flash messages
│   │   └── footer.ejs      # Footer
│   └── listings/
│       └── listing.ejs     # All listings page
├── public/
│   └── css/
│       └── style.css       # Custom styles
├── utils/                  # Utility/helper functions
├── init/                   # Database seed data
├── app.js                  # Main entry point
├── schema.js               # Joi validation schemas
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohdsaqib19/DB-Project.git
   cd DB-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory
   ```env
   MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Seed the database** (optional)
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:3000/listings`

---

## 🚀 Deployment

This project is configured for deployment on **Render.com** with **MongoDB Atlas**.

1. Push code to GitHub
2. Create a new Web Service on [Render.com](https://render.com)
3. Set environment variables in Render dashboard
4. Deploy!

See detailed guide → [Deployment Steps](#)

---

## 📸 Screenshots

> Add screenshots of your project here

---

## 🙋‍♂️ Author

**Mohd Saqib**
- GitHub: [@mohdsaqib19](https://github.com/mohdsaqib19)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
