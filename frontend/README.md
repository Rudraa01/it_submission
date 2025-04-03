# IT Club Task Submission Frontend

This is the frontend application for the IT Club Task Submission system. It provides a modern, responsive interface for users to submit tasks, view task gallery, and manage tasks (for administrators).

## Features

- User authentication (login/register)
- Task submission with screenshot upload
- Task gallery with filtering and search
- Admin dashboard for task management
- Responsive design for mobile and desktop
- Modern UI with Material-UI and Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Testing

To run tests:

```bash
npm test
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── layout/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── TaskSubmission.js
│   │   │   ├── TaskGallery.js
│   │   │   └── AdminDashboard.js
│   │   └── routing/
│   │       ├── PrivateRoute.js
│   │       └── AdminRoute.js
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- React.js
- Material-UI
- Tailwind CSS
- React Router
- Axios
- React Toastify

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 