<p align="center">
  <h1 align="center">⚙️ Karakoram Express — Backend</h1>
  <p align="center">
    RESTful API powering the Karakoram Express bus booking platform.
    <br />
    Built with Express 5 · MongoDB · Stripe · Cloudinary
  </p>
</p>

---

## 📋 Overview

The backend for Karakoram Express — a Node.js API that handles bus transit management, seat booking with concurrency control, Stripe payment processing with webhook verification, image uploads via Cloudinary, and admin authentication. Built with a clean **service-layer architecture**.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Express** | 5 | Web framework |
| **MongoDB** | — | Database |
| **Mongoose** | 9 | ODM & schema validation |
| **Stripe** | 22 | Payment processing |
| **Cloudinary** | 2 | Image hosting (CDN) |
| **Multer** | 2 | File upload middleware |
| **dotenv** | 17 | Environment variables |
| **CORS** | 2 | Cross-origin resource sharing |

## 📁 Project Structure

```
karakoram-express-backend/
├── controllers/
│   ├── authController.js            # Admin login (SHA-256)
│   ├── bookingController.js         # Create booking (with transactions)
│   ├── featuredRoutesController.js  # CRUD for featured routes
│   ├── passegerController.js        # Passenger lookup queries
│   ├── paymentController.js         # Stripe checkout + webhooks
│   └── transitController.js         # CRUD for transit routes
├── models/
│   ├── bookingModel.js              # Booking schema
│   ├── featuredRoutesModel.js       # Featured routes schema
│   └── trasitModel.js               # Transit routes schema
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── featuredRoutesRoute.js
│   ├── passengersRoute.js
│   ├── paymentRoute.js
│   └── transitRoutes.js
├── services/
│   ├── bookingService.js            # Booking + seat update logic
│   ├── featuredRoutesServices.js    # Featured routes DB operations
│   └── transitService.js           # Transit CRUD operations
├── middleware/
│   └── multer.js                    # File upload config (disk storage)
├── utils/
│   └── cloudinary.js                # Cloudinary upload + temp cleanup
├── public/
│   └── temp/                        # Temporary file uploads
├── app.js                           # Express app setup & route mounting
├── server.js                        # Server entry + MongoDB connection
├── config.js                        # dotenv configuration
├── config.env                       # Environment variables
└── package.json
```

## 🏗️ Architecture

The backend follows a **Service-Layer Pattern**:

```
Request → Route → Controller → Service → Model → MongoDB
```

- **Routes** — Define endpoints and HTTP methods
- **Controllers** — Handle request/response, validation, error handling
- **Services** — Contain business logic and database operations
- **Models** — Mongoose schemas with validation rules

## 🗃️ Data Models

### Booking
| Field | Type | Details |
|---|---|---|
| `name` | String | Passenger name (max 40 chars) |
| `cnicNo` | String | CNIC number (max 13 chars) |
| `phoneNo` | String | Contact number |
| `vehicleNo` | String | Assigned vehicle |
| `datOfBooking` | Date | Auto-set to current date |
| `transitDat` | Date | Travel date |
| `seatsBooked` | [Number] | Array of seat numbers |
| `ticketPrice` | Number | Price per seat |
| `noOfSeatsBooked` | Number | Total seats count |
| `totalAmount` | Number | Total price |
| `to` | String | Enum: Rawalpindi, Skardu, Gilgit, Gahkuch |
| `from` | String | Enum: Rawalpindi, Skardu, Gilgit, Gahkuch |
| `status` | String | Default: "pending" → "paid" |

### Transit
| Field | Type | Details |
|---|---|---|
| `from` | String | Enum: Skardu, Gilgit, Rawalpindi |
| `to` | String | Enum: Skardu, Gilgit, Rawalpindi |
| `totalSeats` | Number | Default: 44 |
| `departure` | Date | Departure datetime |
| `arrival` | Date | Arrival datetime |
| `vehicleNumber` | String | Vehicle identifier |
| `ticketPrice` | Number | Fare per seat |
| `bookedSeats` | [Number] | Occupied seat numbers |

### Featured Routes
| Field | Type | Details |
|---|---|---|
| `from` | String | Origin city |
| `to` | String | Destination city |
| `price` | Number | Route fare |
| `image` | String | Cloudinary URL |

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login |

### Transit Routes
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/transit` | Create transit route |
| `GET` | `/api/transit` | Search by origin, destination, date range |
| `GET` | `/api/transit/all` | Get all transit routes |
| `PUT` | `/api/transit/:id` | Update transit route |
| `DELETE` | `/api/transit/:id` | Delete transit route |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/booking` | Create booking (with transaction) |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payment` | Create Stripe Checkout Session |
| `POST` | `/webhook` | Stripe webhook handler |

### Featured Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/featuredRoutes` | Get all featured routes |
| `POST` | `/api/featuredRoutes` | Add featured route (with image) |

### Passengers
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/passengers` | Query passengers by route, date, vehicle |

## 🔑 Key Technical Decisions

### 1. MongoDB Transactions for Seat Booking
Bookings use `mongoose.startSession()` with `startTransaction()` / `commitTransaction()` / `abortTransaction()` to atomically create a booking AND update the transit's booked seats. A `$nin` guard ensures no double-booking:

```javascript
transitModel.findOneAndUpdate(
  { bookedSeats: { $nin: seatsToBook } },
  { $push: { bookedSeats: { $each: seatsToBook } } },
  { session }
)
```

### 2. Webhook Before JSON Middleware
The Stripe webhook endpoint is registered **before** `express.json()` to preserve the raw body for signature verification:

```javascript
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());
```

### 3. Cloudinary Upload Pipeline
`Multer (disk) → Cloudinary upload → Save URL to MongoDB → Delete temp file (finally block)`

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** instance (local or Atlas)
- **Stripe** account with API keys
- **Cloudinary** account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/karakoram-express-backend.git
cd karakoram-express-backend

# Install dependencies
npm install

# Create temp upload directory
mkdir -p public/temp
```

### Environment Variables

Create a `config.env` file:

```env
PORT=3000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/karakoram-express

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_KEY=whsec_...

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

EMAIL=admin@example.com
PASSWORD=<sha256-hash-of-password>

FRONTEND_URL=http://localhost:5173
```

### Run Development Server

```bash
npm run server
```

Server runs at `http://localhost:3000`

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run server` | Start with nodemon (auto-restart) |
| `npm test` | Run tests (not configured yet) |

## 🔗 Related

- **Frontend** — [karakoram-express](https://github.com/your-username/karakoram-express)

## 📄 License

This project is private.

---

<p align="center">Built with ☕ by <strong>Syed Muzammil Ali Shah</strong></p>
