import { Box, Modal as MaterialModal } from '@mui/material';

const Modal = ({ children, open, onClose }) => {
  return (
    <MaterialModal open={open} onClose={onClose}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '1rem',
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </MaterialModal>
  );
};

export default Modal;
