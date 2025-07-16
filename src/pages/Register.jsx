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
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      alert("Account created");
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
          Create an Account
        </Typography>
        <Typography variant="body2" mb={2}>
          Create an account to continue
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            color="primary"
            label="Email address"
            name="email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            color="primary"
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            fullWidth
            color="primary"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Box display="flex" justifyContent="flex-start" mt={1}>
            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  size="small"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="I accept terms and conditions"
            />
          </Box>
          {formik.touched.terms && formik.errors.terms && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: "left", display: "block", ml: 1 }}
            >
              {formik.errors.terms}
            </Typography>
          )}

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
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
