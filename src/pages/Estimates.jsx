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
  Chip,
  IconButton,
  Pagination,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

export default function Estimates() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { items: estimatesData } = useSelector((state) => state.estimates);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = [
    { id: "version", label: t("version") },
    { id: "project", label: t("project") },
    { id: "client", label: t("client") },
    { id: "createdDate", label: t("createdDate") },
    { id: "lastModified", label: t("lastModified") },
    { id: "status", label: t("status") },
    { id: "action", label: t("action") },
  ];

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return estimatesData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, estimatesData]);

  const totalPages = Math.ceil(estimatesData.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return { backgroundColor: "#e8f5e8", color: "#2e7d32" };
      case "Processing":
        return { backgroundColor: "#e3f2fd", color: "#1976d2" };
      case "Rejected":
        return { backgroundColor: "#ffebee", color: "#d32f2f" };
      case "On Hold":
        return { backgroundColor: "#fff3e0", color: "#f57c00" };
      case "In Transit":
        return { backgroundColor: "#f3e5f5", color: "#7b1fa2" };
      default:
        return { backgroundColor: "#f5f5f5", color: "#666" };
    }
  };

  const formatSelectedStatus = () => {
    if (!status) return "Status";
    return status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    let date;

    try {
      if (dateString.includes("-")) {
        const ddMmmYyyy = dateString.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
        if (ddMmmYyyy) {
          const [, day, month, year] = ddMmmYyyy;
          const monthMap = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
          };
          date = new Date(parseInt(year), monthMap[month], parseInt(day));
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      console.warn("Date parsing failed for:", dateString);
      return dateString;
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.main"
          sx={{ fontSize: "1.5rem" }}
        >
          {t("estimates")}
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/estimations/add")}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
          }}
        >
          {t("addEstimate")}
        </Button>
      </Box>

      <Paper
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "calc(100vh - 180px)",
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
                backgroundColor: "rgba(0,0,0,0.15)",
              },
            },
          }}
        >
          <Table sx={{ minWidth: "800px" }}>
            <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
              <TableRow sx={{ backgroundColor: "background.default" }}>
                {columns.map((column) => (
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
                      ...(column.id === "status" && {
                        textAlign: "center",
                      }),
                      ...(column.id === "action" && {
                        textAlign: "center",
                      }),
                    }}
                  >
                    {column.label}
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
                  <TableCell>
                    <Typography variant="body2" color="text.main">
                      {row.version}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.main">
                      {row.project}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.client}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(row.createdDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(row.lastModified)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        ...getStatusColor(row.status),
                        fontWeight: 500,
                        fontSize: "12px",
                        height: "24px",
                        borderRadius: "12px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/estimations/edit/${row.id}`)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("showing")}{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              estimatesData.length
            )}
            -{Math.min(currentPage * itemsPerPage, estimatesData.length)}{" "}
            {t("of")} {estimatesData.length}
          </Typography>
          <Pagination
            count={Math.ceil(estimatesData.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            size="small"
          />
        </Box>
      </Paper>
    </Box>
  );
}
