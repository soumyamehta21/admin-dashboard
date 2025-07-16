import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login({ email: values.email }));
      navigate("/dashboard");
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
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
          Login to Account
        </Typography>
        <Typography variant="body2" mb={2}>
          Please enter your email and password to continue
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            color="primary"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="primary"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Remember Password"
            />
            <Link
              href="/forgot-password"
              underline="hover"
              fontSize={14}
              color="primary"
            >
              Forgot Password?
            </Link>
          </Box>

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
            Sign In
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          Don’t have an account?{" "}
          <Link href="/register" underline="hover">
            Create Account
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
