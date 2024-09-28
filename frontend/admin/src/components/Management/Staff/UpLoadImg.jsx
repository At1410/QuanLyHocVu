import { useDropzone } from "react-dropzone";
import { Box, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { styled } from "@mui/system";

const Dropzone = styled(Box)(({ theme, isActive, isReject }) => ({
  border: '2px dashed',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  borderColor: isActive
    ? theme.palette.primary.main
    : isReject
      ? '#ff1744'
      : '#ccc',
}));

export default function UpLoadImg() {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
    }
  }, []);

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <Box className="container" p={2}>
      {!selectedImage ? (
        <Dropzone
          {...getRootProps()}
          isActive={isDragActive}
          isReject={isDragReject}
        >
          <input {...getInputProps()} style={{ display: 'none' }} />
          {isDragActive ? (
            <Typography>Thả ảnh vào đây ...</Typography>
          ) : (
            <Typography>Kéo và thả ảnh vào đây hoặc nhấp để chọn ảnh</Typography>
          )}
        </Dropzone>
      ) : (
        <Box mt={2} position="relative" width="100px" height="auto" >
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{
              width: '100px',
              height: 'auto',
              maxHeight: '80%',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
          <IconButton
            onClick={handleRemoveImage}
            style={{
              position: 'absolute',
              top: '1%',
              right: '1%',
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 0,
              borderRadius: '50%',
            }}
          >
            <CloseIcon fontSize="small" sx={{
              '&:hover': {
                color: '#d00000',
              }
            }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
