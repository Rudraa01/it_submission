import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  Collections as GalleryIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <TaskIcon sx={{ fontSize: 40 }} />,
      title: 'Submit Tasks',
      description: 'Easily submit your completed tasks with screenshots and descriptions.',
      link: '/submit-task',
      buttonText: 'Submit Now',
    },
    {
      icon: <GalleryIcon sx={{ fontSize: 40 }} />,
      title: 'View Gallery',
      description: 'Browse through approved task submissions from other members.',
      link: '/gallery',
      buttonText: 'View Gallery',
    },
    {
      icon: <AdminIcon sx={{ fontSize: 40 }} />,
      title: 'Admin Panel',
      description: 'Manage tasks and users through our comprehensive admin dashboard.',
      link: '/admin',
      buttonText: 'Admin Access',
      adminOnly: true,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                IT Club Task Submission
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Submit your tasks, showcase your work, and grow with our community
              </Typography>
              <Button
                component={RouterLink}
                to="/submit-task"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mr: 2 }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/gallery"
                variant="outlined"
                color="inherit"
                size="large"
              >
                View Gallery
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button
                    component={RouterLink}
                    to={feature.link}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {feature.buttonText}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 8,
          mt: 8,
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Join our community of developers and start submitting your tasks today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mr: 2 }}
              >
                Register Now
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 