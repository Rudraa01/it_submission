import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskGallery = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/gallery');
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mt: 4 }}>
        Task Gallery
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s',
                },
              }}
              onClick={() => handleTaskClick(task)}
            >
              {task.screenshot?.url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={task.screenshot.url}
                  alt={task.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Submitted by: {task.submittedBy.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {new Date(task.submittedAt).toLocaleDateString()}
                </Typography>
                <Chip
                  label={task.status}
                  color={getStatusColor(task.status)}
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle>{selectedTask.title}</DialogTitle>
            <DialogContent>
              {selectedTask.screenshot?.url && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={selectedTask.screenshot.url}
                    alt={selectedTask.title}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                  />
                </Box>
              )}
              <Typography variant="body1" paragraph>
                {selectedTask.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submitted by: {selectedTask.submittedBy.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submitted on: {new Date(selectedTask.submittedAt).toLocaleDateString()}
              </Typography>
              {selectedTask.feedback && (
                <Typography variant="body1" color="text.secondary" paragraph>
                  Feedback: {selectedTask.feedback}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<LinkIcon />}
                href={selectedTask.taskLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Task
              </Button>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default TaskGallery; 