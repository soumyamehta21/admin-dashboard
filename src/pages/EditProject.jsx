import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  InputAdornment,
  FormHelperText,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import { CalendarToday, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { projectsData } from "../data/projectsData";

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    customer: "",
    refNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const project = projectsData.find((p) => p.id === parseInt(id));
    if (project) {
      setFormData({
        customer: project.customer || "",
        refNumber: project.refNumber || "",
        projectName: project.projectName || "",
        projectNumber: project.projectNumber || "",
        areaLocation: project.areaLocation || "",
        address: project.address || "",
        dueDate: "",
        contact: "",
        manager: "",
        staff: "",
        status: project.status || "",
        email: "",
      });
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.refNumber)
      newErrors.refNumber = "Reference number is required";
    if (!formData.projectName)
      newErrors.projectName = "Project name is required";
    if (!formData.projectNumber)
      newErrors.projectNumber = "Project number is required";
    if (!formData.areaLocation)
      newErrors.areaLocation = "Area location is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.manager) newErrors.manager = "Manager is required";
    if (!formData.staff) newErrors.staff = "Staff is required";
    if (!formData.status) newErrors.status = "Status is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleInputChange("dueDate", formattedDate);
    setShowDatePicker(false);
  };

  const formatDisplayDate = () => {
    if (!formData.dueDate) return "Select due date";
    const date = new Date(formData.dueDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isDateSelected = (date) => {
    if (!formData.dueDate) return false;
    const selectedDate = new Date(formData.dueDate);
    return date.toDateString() === selectedDate.toDateString();
  };

  const DatePicker = () => {
    const days = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          p: 2,
          minWidth: "280px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton onClick={() => navigateMonth(-1)} size="small">
            <ChevronLeft />
          </IconButton>
          <Typography variant="subtitle1" fontWeight="medium">
            {monthYear}
          </Typography>
          <IconButton onClick={() => navigateMonth(1)} size="small">
            <ChevronRight />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            mb: 2,
          }}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <Typography
              key={day}
              variant="caption"
              sx={{
                textAlign: "center",
                fontWeight: "medium",
                color: "text.secondary",
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}
        >
          {days.map((day, index) => (
            <Box
              key={index}
              onClick={() => day && handleDateSelect(day)}
              sx={{
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: day ? "pointer" : "default",
                borderRadius: "4px",
                backgroundColor:
                  day && isDateSelected(day) ? "primary.main" : "transparent",
                color: day && isDateSelected(day) ? "white" : "text.primary",
                "&:hover": day
                  ? {
                      backgroundColor:
                        day && isDateSelected(day)
                          ? "primary.main"
                          : "action.hover",
                    }
                  : {},
              }}
            >
              {day && <Typography variant="body2">{day.getDate()}</Typography>}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowDatePicker(false)}
            sx={{ textTransform: "none" }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>
    );
  };

  const handleUpdateProject = () => {
    if (validateForm()) {
      console.log("Updating project:", formData);
      navigate("/projects");
    }
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <Box sx={{ p: 0 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color="text.main"
        sx={{ fontSize: "1.5rem" }}
      >
        Edit Project
      </Typography>

      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "12px",
          p: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px 50px",
            "@media (max-width: 900px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 600px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* Customer */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Customer
            </Typography>
            <FormControl fullWidth error={!!errors.customer}>
              <Select
                value={formData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
                displayEmpty
                size="small"
                sx={{
                  backgroundColor: "background.dashboard",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  height: "40px",
                }}
              >
                <MenuItem value="" disabled>
                  Select customer
                </MenuItem>
                <MenuItem value="Olivia Martin">Olivia Martin</MenuItem>
                <MenuItem value="Michael Jones">Michael Jones</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
              </Select>
              {errors.customer && (
                <FormHelperText>{errors.customer}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Reference Number */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Reference Number
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your reference number"
              value={formData.refNumber}
              onChange={(e) => handleInputChange("refNumber", e.target.value)}
              error={!!errors.refNumber}
              helperText={errors.refNumber}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Project Name */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Project Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your project name"
              value={formData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              error={!!errors.projectName}
              helperText={errors.projectName}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Project Number */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Project Number
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your project number"
              value={formData.projectNumber}
              onChange={(e) =>
                handleInputChange("projectNumber", e.target.value)
              }
              error={!!errors.projectNumber}
              helperText={errors.projectNumber}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Area Location */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Area Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your project area location"
              value={formData.areaLocation}
              onChange={(e) =>
                handleInputChange("areaLocation", e.target.value)
              }
              error={!!errors.areaLocation}
              helperText={errors.areaLocation}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Address */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your project address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Due Date */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Due Date
            </Typography>
            <ClickAwayListener onClickAway={() => setShowDatePicker(false)}>
              <Box sx={{ position: "relative" }}>
                <Box
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    border: errors.dueDate ? "1px solid" : "none",
                    borderColor: errors.dueDate ? "error.main" : "transparent",
                    borderRadius: "4px",
                    backgroundColor: "background.dashboard",
                    height: "40px",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: formData.dueDate
                        ? "text.primary"
                        : "text.secondary",
                    }}
                  >
                    {formatDisplayDate()}
                  </Typography>
                  <CalendarToday
                    sx={{ color: "text.secondary", fontSize: "18px" }}
                  />
                </Box>
                {errors.dueDate && (
                  <FormHelperText error>{errors.dueDate}</FormHelperText>
                )}
                {showDatePicker && <DatePicker />}
              </Box>
            </ClickAwayListener>
          </Box>

          {/* Contact */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Contact
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your contact"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              error={!!errors.contact}
              helperText={errors.contact}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>

          {/* Manager */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Manager
            </Typography>
            <FormControl fullWidth error={!!errors.manager}>
              <Select
                value={formData.manager}
                onChange={(e) => handleInputChange("manager", e.target.value)}
                displayEmpty
                size="small"
                sx={{
                  backgroundColor: "background.dashboard",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  height: "40px",
                }}
              >
                <MenuItem value="" disabled>
                  Select project manager
                </MenuItem>
                <MenuItem value="Sarah Williams">Sarah Williams</MenuItem>
                <MenuItem value="Robert Johnson">Robert Johnson</MenuItem>
                <MenuItem value="Isabella Anderson">Isabella Anderson</MenuItem>
              </Select>
              {errors.manager && (
                <FormHelperText>{errors.manager}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Staff */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Staff
            </Typography>
            <FormControl fullWidth error={!!errors.staff}>
              <Select
                value={formData.staff}
                onChange={(e) => handleInputChange("staff", e.target.value)}
                displayEmpty
                size="small"
                sx={{
                  backgroundColor: "background.dashboard",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  height: "40px",
                }}
              >
                <MenuItem value="" disabled>
                  Select project staff
                </MenuItem>
                <MenuItem value="Staff 1">Staff 1</MenuItem>
                <MenuItem value="Staff 2">Staff 2</MenuItem>
                <MenuItem value="Staff 3">Staff 3</MenuItem>
              </Select>
              {errors.staff && <FormHelperText>{errors.staff}</FormHelperText>}
            </FormControl>
          </Box>

          {/* Status */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Status
            </Typography>
            <FormControl fullWidth error={!!errors.status}>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                displayEmpty
                size="small"
                sx={{
                  backgroundColor: "background.dashboard",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  height: "40px",
                }}
              >
                <MenuItem value="" disabled>
                  Select project status
                </MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="In Transit">In Transit</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText>{errors.status}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Email */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ fontSize: "14px" }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                backgroundColor: "background.dashboard",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-root": { height: "40px" },
              }}
            />
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            onClick={handleUpdateProject}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              height: "36px",
            }}
          >
            Update Now
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              height: "36px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
