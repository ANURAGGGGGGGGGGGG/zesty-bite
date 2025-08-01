# 🍽️ ZestyBite - Modern Food Ordering Web App

A full-stack food ordering web application built with Next.js 15, featuring a customer-facing menu and cart system, plus an admin panel for managing orders and menu items.

## ✨ Features

### Customer Features
- 🏠 **Homepage** with hero section and featured categories
- 📱 **Responsive Menu** with category filtering
- 🍕 **Product Detail Pages** with customization options
- 🛒 **Shopping Cart** with quantity management
- 💳 **Checkout Process** with order summary
- 📦 **Order Tracking** with real-time status updates

### Admin Features
- 🔐 **Secure Admin Login**
- 📊 **Dashboard** with order management
- 🍔 **Menu Management** (Add/Edit/Delete items)
- 📋 **Order Status Updates**
- 🔄 **Real-time Order Tracking**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Icons**: Heroicons, Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/zestybite
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

3. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zesty-bite/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   └── login/
│   ├── api/
│   │   ├── menu/
│   │   └── orders/
│   ├── cart/
│   ├── checkout/
│   ├── menu/
│   │   └── [id]/
│   ├── order/
│   │   └── [id]/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   ├── mongodb.js
│   └── store.js
├── public/
└── ...
```

## 🔗 API Endpoints

### Menu Items
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item (Admin)
- `PUT /api/menu` - Update menu item (Admin)
- `DELETE /api/menu?id={id}` - Delete menu item (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order
- `PUT /api/orders/[id]` - Update order status (Admin)
- `DELETE /api/orders/[id]` - Cancel order

## 🎯 Usage

### Customer Flow
1. Browse menu items on the homepage or menu page
2. Click on items to view detailed product pages
3. Add items to cart with customizations
4. Proceed to checkout and fill delivery information
5. Place order and track status on order page

### Admin Flow
1. Login at `/admin/login` (admin/admin123)
2. Manage orders from the dashboard
3. Add/edit/delete menu items
4. Update order statuses in real-time

## 🔧 Configuration

### MongoDB Setup

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/zestybite
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zestybite?retryWrites=true&w=majority
```

### Sample Data
The application automatically seeds the database with sample menu items on first run.

## 🎨 Customization

### Adding New Menu Categories
1. Update the category filter in `app/menu/page.js`
2. Add category-specific icons and styling
3. Update the sample data in `app/api/menu/route.js`

### Styling
The app uses Tailwind CSS. Customize colors and styling in:
- `tailwind.config.js` for theme configuration
- `app/globals.css` for global styles

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Railway
- Netlify
- DigitalOcean App Platform

## 🔒 Security Features

- Input validation on all forms
- Secure admin authentication
- Environment variable protection
- CORS configuration
- SQL injection prevention (NoSQL)

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure MongoDB is running
4. Check network connectivity

## 🔮 Future Enhancements

- [ ] User authentication for customers
- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time notifications with WebSockets
- [ ] Order history for customers
- [ ] Reviews and ratings system
- [ ] Inventory management
- [ ] Multi-restaurant support
- [ ] PWA support
- [ ] Email notifications
- [ ] Analytics dashboard

---

**Built with ❤️ using Next.js and modern web technologies**
