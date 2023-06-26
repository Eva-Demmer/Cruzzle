import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OverlayLogin from "../overlays/OverlayLogin";

function LoginForm() {
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const validateMail = (mailInput) => {
    // Regular expression for mail validation
    const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return mailRegex.test(mailInput);
  };

  const handleMailChange = (e) => {
    const inputValue = e.target.value;
    setMail(inputValue);
    // Check if mail format is valid
    setMailError(!validateMail(inputValue));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // Call on backend
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Check if all fields are filled out
  //   if (email === "" || password === "") {
  //     setAlertMessage("Please fill out all the fields!");
  //     setShowAlert(true);
  //   } else {
  //     try {
  //       // Make the HTTP request to backend API
  //       const response = await axios.post(
  //         "http://localhost:6001/api/users/login",
  //         { email, password },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       // Return a JWT token upon successful login & redirect to home page
  //       if (response.status === 200) {
  //         localStorage.setItem("token", `Bearer ${response.data}`);
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       // Handle any errors that occur during the request
  //       console.error("Login failed:", error);
  //       setAlertMessage("Login failed. Please try again later.");
  //       setShowAlert(true);
  //     }
  //   }
  // };

  //  Call on backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled out
    if (mail === "" || password === "") {
      setAlertMessage("Please fill out all the fields!");
      setShowAlert(true);
    } else {
      try {
        // Make the HTTP request to backend API
        const response = await axios.post(
          "http://localhost:6001/api/users/login",
          { mail, password }
        );

        // Check the response status
        if (response.status === 200) {
          // Extract the JWT token from the response data
          const { token } = response.data;

          // Store the token in localStorage
          localStorage.setItem("token", token);

          // Redirect to the home page
          navigate("/");
        } else {
          // Handle unsuccessful login (status code other than 200)
          setAlertMessage("Login failed. Please try again later.");
          setShowAlert(true);
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Login failed:", error);
        setAlertMessage("Login failed. Please try again later.");
        setShowAlert(true);
      }
    }
  };

  const handleCloseAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  return (
    <div className="flex justify-center">
      <Paper elevation={6} className="p-5 max-w-sm">
        <h2 className="text-center">Login</h2>
        <p className="my-8 text-center">Please enter your login details.</p>
        <TextField
          id="login-mail"
          type="mail"
          label="Mail address"
          name="mail"
          value={mail}
          autoComplete="mail"
          autoFocus
          onChange={handleMailChange}
          error={mailError}
          helperText={mailError ? "Please enter a valid mail address." : ""}
          variant="outlined"
          required
          fullWidth
          className=""
        />
        <FormControl
          variant="outlined"
          required
          fullWidth
          className="mt-4 mb-2"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <OverlayLogin />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          className="mt-4"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {showAlert && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

export default LoginForm;
