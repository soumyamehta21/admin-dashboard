import { Box, TextField, Typography, Button, Paper, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(`Reset link sent to ${values.email}`);
    },
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom right, #4880ff, #4880ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 400,
          maxWidth: "90%",
          textAlign: "center",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" mb={2}>
          Enter your email address and we'll send you a reset link
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            color="primary"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              borderRadius: 1,
              backgroundColor: "primary.main",
              ":hover": { backgroundColor: "primary.secondary" },
            }}
            style={{ textTransform: "none" }}
          >
            Send Reset Link
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          <Link href="/login" underline="hover">
            Back to Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
