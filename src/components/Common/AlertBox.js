import { Box, Alert } from "@mui/material";

export const AlertBox = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        height: "55vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert
        sx={{
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
        }}
        severity="error"
      >
        {message}
      </Alert>
    </Box>
  );
};
