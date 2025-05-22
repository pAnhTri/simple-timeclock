# Simple Time Clock In and Out

This project is a simple web application to help people keep track of their clock in and clock out times locally.

## Features
- Log clock in and clock out times for employees
- View daily logs
- Copy pre-lunch and post-lunch times for easy reporting

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/pAnhTri/simple-timeclock.git
   cd simple-timeclock
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure MongoDB:**
   - Make sure you have a local MongoDB instance running.
   - Update your environment variables (e.g., `.env.local`) with your MongoDB connection string if needed.

4. **Add Employees:**
   - Before using the app, ensure there are some employees in the database. You can add them manually using a MongoDB client or script.

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Use the interface to clock in and out for employees.
- View logs and copy times as needed for reporting.

---

Feel free to contribute or open issues if you have suggestions or encounter problems.
