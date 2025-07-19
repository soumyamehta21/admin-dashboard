import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
  Tooltip,
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

export default function Projects() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { items: projectsData } = useSelector((state) => state.projects);

  const [filterBy, setFilterBy] = useState("Date");
  const [status, setStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideColumns, setHideColumns] = useState([]);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const itemsPerPage = 10;

  const columns = [
    { id: "customer", label: t("customer") },
    { id: "refNumber", label: t("refNumber") },
    { id: "projectReference", label: "PROJECT REFERENCE" },
    { id: "projectLocation", label: "PROJECT LOCATION" },
    { id: "dueDate", label: t("dueDate") },
    { id: "status", label: t("status") },
  ];

  const statusOptions = [
    { value: "created", label: t("created") },
    { value: "processing", label: t("processing") },
    { value: "rejected", label: t("rejected") },
    { value: "onhold", label: t("onhold") },
    { value: "intransit", label: t("intransit") },
    { value: "delivered", label: t("delivered") },
    { value: "pending", label: t("pending") },
    { value: "completed", label: t("completed") },
  ];

  const filteredData = useMemo(() => {
    let filtered = projectsData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.areaLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.dueDate && item.dueDate.includes(searchTerm))
      );
    }

    if (status.length > 0) {
      filtered = filtered.filter((item) => status.includes(item.status));
    }

    // Fix date filtering logic
    if (selectedDates.length > 0) {
      filtered = filtered.filter((item) => {
        if (!item.dueDate) return false;
        const itemDate = new Date(item.dueDate);

        return selectedDates.some((selectedDate) => {
          return (
            itemDate.getFullYear() === selectedDate.getFullYear() &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getDate() === selectedDate.getDate()
          );
        });
      });
    }

    return filtered;
  }, [searchTerm, status, projectsData, selectedDates]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleReset = () => {
    setFilterBy("Date");
    setStatus([]);
    setSearchTerm("");
    setSelectedDates([]);
    setCurrentPage(1);
    setShowDatePicker(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDates((prev) => {
      // Create a new date in local timezone to avoid timezone issues
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const dateString = localDate.toDateString();
      const isSelected = prev.some((d) => d.toDateString() === dateString);

      if (isSelected) {
        return prev.filter((d) => d.toDateString() !== dateString);
      } else {
        return [...prev, localDate];
      }
    });
  };

  const formatSelectedDates = () => {
    if (selectedDates.length === 0) return t("date");
    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return `${selectedDates.length} ${t("datesSelected")}`;
  };

  const getFullDateText = () => {
    if (selectedDates.length === 0) return t("date");
    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    const sortedDates = [...selectedDates].sort((a, b) => a - b);
    return sortedDates
      .map((date) =>
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      )
      .join(", ");
  };

  const isDateSelected = (date) => {
    return selectedDates.some((d) => d.toDateString() === date.toDateString());
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

  const ColumnPicker = () => {
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
          borderRadius: "16px",
          p: 2,
          minWidth: "450px",
          maxWidth: "500px",
          width: "475px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Select Columns
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {columns.map((column) => (
            <Box
              key={column.id}
              onClick={() => {
                setHideColumns((prev) =>
                  prev.includes(column.id)
                    ? prev.filter((id) => id !== column.id)
                    : [...prev, column.id]
                );
              }}
              sx={{
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                border: "1px solid",
                borderColor: hideColumns.includes(column.id)
                  ? "divider"
                  : "primary.main",
                backgroundColor: hideColumns.includes(column.id)
                  ? "transparent"
                  : "primary.main",
                color: hideColumns.includes(column.id)
                  ? "text.primary"
                  : "white",
                "&:hover": {
                  backgroundColor: hideColumns.includes(column.id)
                    ? "action.hover"
                    : "primary.dark",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {column.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          *You can choose multiple Columns to hide
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowColumnPicker(false)}
            sx={{ textTransform: "none" }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>
    );
  };

  const StatusPicker = () => {
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
          minWidth: "450px",
          maxWidth: "500px",
          width: "475px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Select Status
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {statusOptions.map((option) => (
            <Box
              key={option?.value}
              onClick={() => {
                setStatus((prev) =>
                  prev.includes(option?.value)
                    ? prev.filter((s) => s !== option?.value)
                    : [...prev, option?.value]
                );
              }}
              sx={{
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                border: "1px solid",
                borderColor: status.includes(option?.value)
                  ? "primary.main"
                  : "divider",
                backgroundColor: status.includes(option?.value)
                  ? "primary.main"
                  : "transparent",
                color: status.includes(option?.value)
                  ? "white"
                  : "text.primary",
                "&:hover": {
                  backgroundColor: status.includes(option?.value)
                    ? "primary.dark"
                    : "action.hover",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {option.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          *You can choose multiple status
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowStatusPicker(false)}
            sx={{ textTransform: "none" }}
          >
            {t("applyNow")}
          </Button>
        </Box>
      </Box>
    );
  };

  const visibleColumns = columns.filter(
    (column) => !hideColumns.includes(column.id)
  );

  const formatSelectedColumns = () => {
    const hiddenCount = hideColumns.length;
    if (hiddenCount === 0) return t("hideColumns");
    return `${hiddenCount} ${t("hidden")}`;
  };

  const getFullColumnsText = () => {
    if (hideColumns.length === 0) return t("hideColumns");
    const hiddenColumnNames = columns
      .filter((col) => hideColumns.includes(col.id))
      .map((col) => col.label);
    return `${t("hidden")}: ${hiddenColumnNames.join(", ")}`;
  };

  const formatSelectedStatus = () => {
    if (status.length === 0) return t("status");
    if (status.length === 1) return t(status[0]);
    return `${status.length} ${t("selected")}`;
  };

  const getFullStatusText = () => {
    if (status.length === 0) return t("status");
    if (status.length === 1) return `${t("selected")}: ${t(status[0])}`;
    const statusLabels = status.map((s) => t(s));
    return `${t("selected")}: ${statusLabels.join(", ")}`;
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
        {t("projects")}
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
          }}
        >
          <IconButton
            sx={{
              color: "text.secondary",
              padding: "6px",
              border: "1px solid transparent",
              borderRadius: "50%",
              flexShrink: 0,
              "&:hover": {
                backgroundColor: "transparent",
                border: "1px solid",
                borderColor: "text.primary",
                color: "text.primary",
              },
            }}
          >
            <FilterList />
          </IconButton>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "divider" }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t("filterBy")}
            </Typography>
          </Box>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "divider" }}
          />

          <ClickAwayListener onClickAway={() => setShowDatePicker(false)}>
            <Box sx={{ position: "relative" }}>
              <Tooltip title={getFullDateText()} placement="top">
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
                    width: 120,
                    minWidth: 120,
                    maxWidth: 120,
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {formatSelectedDates()}
                  </Typography>
                  <KeyboardArrowDown sx={{ fontSize: 16, flexShrink: 0 }} />
                </Box>
              </Tooltip>
              {showDatePicker && <DatePicker />}
            </Box>
          </ClickAwayListener>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "divider" }}
          />

          <ClickAwayListener onClickAway={() => setShowColumnPicker(false)}>
            <Box sx={{ position: "relative" }}>
              <Tooltip title={getFullColumnsText()} placement="top">
                <Box
                  onClick={() => setShowColumnPicker(!showColumnPicker)}
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
                    width: 120,
                    minWidth: 120,
                    maxWidth: 120,
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {formatSelectedColumns()}
                  </Typography>
                  <KeyboardArrowDown sx={{ fontSize: 16, flexShrink: 0 }} />
                </Box>
              </Tooltip>
              {showColumnPicker && <ColumnPicker />}
            </Box>
          </ClickAwayListener>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "divider" }}
          />

          <ClickAwayListener onClickAway={() => setShowStatusPicker(false)}>
            <Box sx={{ position: "relative" }}>
              <Tooltip title={getFullStatusText()} placement="top">
                <Box
                  onClick={() => setShowStatusPicker(!showStatusPicker)}
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
                    width: 120,
                    minWidth: 120,
                    maxWidth: 120,
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {formatSelectedStatus()}
                  </Typography>
                  <KeyboardArrowDown sx={{ fontSize: 16, flexShrink: 0 }} />
                </Box>
              </Tooltip>
              {showStatusPicker && <StatusPicker />}
            </Box>
          </ClickAwayListener>

          <Box
            sx={{ width: "1px", height: "32px", backgroundColor: "divider" }}
          />

          <Button
            variant="text"
            startIcon={<Refresh />}
            onClick={handleReset}
            sx={{
              color: "error.main",
              borderRedius: "16px",
              textTransform: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            {t("resetFilter")}
          </Button>
        </Box>

        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/projects/add")}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
            }}
          >
            {t("addNewProject")}
          </Button>
        </Box>
      </Box>

      <Paper
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "calc(100vh - 265px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "auto",
            minWidth: "800px",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.15)", // Lighter hover
              },
            },
          }}
        >
          <Table sx={{ minWidth: "800px" }}>
            <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
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
                  onClick={() => navigate(`/projects/edit/${row.id}`)}
                  sx={{
                    cursor: "pointer",
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
                  {!hideColumns.includes("dueDate") && (
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.dueDate
                          ? new Date(row.dueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "No date"}
                      </Typography>
                    </TableCell>
                  )}
                  {!hideColumns.includes("status") && (
                    <TableCell>
                      <Chip
                        label={t(row.status)}
                        size="small"
                        sx={{
                          backgroundColor:
                            row.status === "completed"
                              ? "#e8f5e8"
                              : row.status === "processing"
                              ? "#fff3e0"
                              : "#ffebee",
                          color:
                            row.status === "completed"
                              ? "#2e7d32"
                              : row.status === "processing"
                              ? "#f57c00"
                              : "#d32f2f",
                          fontWeight: 500,
                          fontSize: "12px",
                          height: "24px",
                          borderRadius: "12px",
                        }}
                      />
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
            {t("showing")} {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
            {t("of")} {filteredData.length}
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
        <DialogTitle>{t("selectColumns")}</DialogTitle>
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
            {t("selectMultipleColumns")}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setShowColumnDialog(false)}
              sx={{ textTransform: "none" }}
            >
              {t("applyNow")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
