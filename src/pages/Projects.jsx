import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Pagination,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import {
  FilterList,
  Add,
  VisibilityOff,
  Refresh,
  Search,
  KeyboardArrowDown,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { projectsData } from "../data/projectsData";

export default function Projects() {
  const [filterBy, setFilterBy] = useState("Date");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hideColumns, setHideColumns] = useState([]);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const itemsPerPage = 10;

  const columns = [
    { id: "customer", label: "CUSTOMER" },
    { id: "refNumber", label: "REF NUMBER" },
    { id: "projectReference", label: "PROJECT REFERENCE" },
    { id: "projectLocation", label: "PROJECT LOCATION" },
  ];

  const statusOptions = [
    "Completed",
    "Processing",
    "Rejected",
    "On Hold",
    "In Transit",
  ];

  const filteredData = useMemo(() => {
    let filtered = projectsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.areaLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    return filtered;
  }, [searchTerm, status]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleReset = () => {
    setFilterBy("Date");
    setStatus("");
    setSearchTerm("");
    setSelectedDate(null);
    setCurrentPage(1);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
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
                  selectedDate &&
                  day &&
                  day.toDateString() === selectedDate.toDateString()
                    ? "primary.main"
                    : "transparent",
                color:
                  selectedDate &&
                  day &&
                  day.toDateString() === selectedDate.toDateString()
                    ? "white"
                    : "text.primary",
                "&:hover": day
                  ? {
                      backgroundColor:
                        selectedDate &&
                        day &&
                        day.toDateString() === selectedDate.toDateString()
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

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          *You can choose multiple date
        </Typography>

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

  const visibleColumns = columns.filter(
    (column) => !hideColumns.includes(column.id)
  );

  return (
    <Box sx={{ p: 0 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color="text.main"
        sx={{ fontSize: "1.5rem" }}
      >
        Projects
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            px: 2,
            py: 1.5,
            "& > *:not(:last-child)::after": {
              content: '""',
              width: "1px",
              height: "32px",
              backgroundColor: "divider",
              marginLeft: "8px",
            },
          }}
        >
          <IconButton
            sx={{
              color: "text.secondary",
              padding: "4px",
              "&:hover": {
                backgroundColor: "action.hover",
                color: "primary.main",
              },
            }}
          >
            <FilterList />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Filter By
            </Typography>
            <ClickAwayListener onClickAway={() => setShowDatePicker(false)}>
              <Box sx={{ position: "relative" }}>
                <Box
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: "8px 12px",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                    minWidth: 120,
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography variant="body2">
                    {selectedDate ? formatDate(selectedDate) : "Date"}
                  </Typography>
                  <KeyboardArrowDown sx={{ fontSize: 16 }} />
                </Box>
                {showDatePicker && <DatePicker />}
              </Box>
            </ClickAwayListener>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Hide Columns
            </Typography>
            <IconButton
              onClick={() => setShowColumnDialog(true)}
              sx={{ color: "text.secondary" }}
            >
              <VisibilityOff />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="">All</MenuItem>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="text"
            startIcon={<Refresh />}
            onClick={handleReset}
            sx={{ color: "error.main", textTransform: "none" }}
          >
            Reset Filter
          </Button>
        </Box>

        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
            }}
          >
            Add Project
          </Button>
        </Box>
      </Box>

      <Paper
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "calc(100vh - 280px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            },
            "&::-webkit-scrollbar-thumb:active": {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "background.default" }}>
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      backgroundColor: "background.default",
                      ...(column.id === "projectReference" && {
                        textAlign: "center",
                      }),
                      ...(column.id === "projectLocation" && {
                        textAlign: "center",
                      }),
                    }}
                  >
                    {column.label}
                    {column.id === "projectReference" && (
                      <Box
                        sx={{
                          display: "flex",
                          mt: 1,
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "10px",
                            color: "text.secondary",
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          PROJECT NAME
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "10px",
                            color: "text.secondary",
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          PROJECT NUMBER
                        </Typography>
                      </Box>
                    )}
                    {column.id === "projectLocation" && (
                      <Box
                        sx={{
                          display: "flex",
                          mt: 1,
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "10px",
                            color: "text.secondary",
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          AREA LOCATION
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "10px",
                            color: "text.secondary",
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          ADDRESS
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {!hideColumns.includes("customer") && (
                    <TableCell>
                      <Typography variant="body2" color="text.main">
                        {row.customer}
                      </Typography>
                    </TableCell>
                  )}
                  {!hideColumns.includes("refNumber") && (
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.refNumber}
                      </Typography>
                    </TableCell>
                  )}
                  {!hideColumns.includes("projectReference") && (
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.main"
                            sx={{
                              textAlign: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.projectName}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textAlign: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.projectNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  )}
                  {!hideColumns.includes("projectLocation") && (
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.main"
                            sx={{
                              textAlign: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.areaLocation}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textAlign: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.address}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            flexShrink: 0,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Column Selection Dialog */}
      <Dialog
        open={showColumnDialog}
        onClose={() => setShowColumnDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select Columns</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {columns.map((column) => (
              <Chip
                key={column.id}
                label={column.label}
                variant={
                  hideColumns.includes(column.id) ? "outlined" : "filled"
                }
                color="primary"
                onClick={() => {
                  setHideColumns((prev) =>
                    prev.includes(column.id)
                      ? prev.filter((id) => id !== column.id)
                      : [...prev, column.id]
                  );
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            *You can choose multiple Columns to hide
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setShowColumnDialog(false)}
              sx={{ textTransform: "none" }}
            >
              Apply Now
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
