import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

// Sample estimates data
const estimatesData = [
  {
    id: 1,
    version: "00001",
    project: "Christine Brooks",
    client: "089 Kutch Green Apt. 448",
    createdDate: "04 Sep 2019",
    lastModified: "12-Jan-2022",
    status: "Created",
  },
  {
    id: 2,
    version: "00002",
    project: "Rosie Pearson",
    client: "979 Immanuel Ferry Suite 526",
    createdDate: "28 May 2019",
    lastModified: "29-Jul-2024",
    status: "Processing",
  },
  {
    id: 3,
    version: "00003",
    project: "Darrell Caldwell",
    client: "8587 Frida Ports",
    createdDate: "23 Nov 2019",
    lastModified: "16-Mar-2022",
    status: "Rejected",
  },
  {
    id: 4,
    version: "00004",
    project: "Gilbert Johnston",
    client: "768 Destiny Lake Suite 600",
    createdDate: "05 Feb 2019",
    lastModified: "10-Dec-2021",
    status: "Created",
  },
  {
    id: 5,
    version: "00005",
    project: "Alan Cain",
    client: "042 Mylene Throughway",
    createdDate: "29 Jul 2019",
    lastModified: "21-Mar-2022",
    status: "Processing",
  },
  {
    id: 6,
    version: "00006",
    project: "Alfred Murray",
    client: "543 Weimann Mountain",
    createdDate: "15 Aug 2019",
    lastModified: "20-Apr-2023",
    status: "Created",
  },
  {
    id: 7,
    version: "00007",
    project: "Maggie Sullivan",
    client: "New Scottsboro",
    createdDate: "21 Dec 2019",
    lastModified: "16-Nov-2023",
    status: "Processing",
  },
  {
    id: 8,
    version: "00008",
    project: "Rosie Todd",
    client: "New Jon",
    createdDate: "30 Apr 2019",
    lastModified: "01-May-2023",
    status: "On Hold",
  },
  {
    id: 9,
    version: "00009",
    project: "Dollie Hines",
    client: "124 Lyla Forge Suite 975",
    createdDate: "09 Jan 2019",
    lastModified: "23-Oct-2022",
    status: "In Transit",
  },
];

export default function Estimates() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  }, [currentPage]);

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
        <TableContainer sx={{ flexGrow: 1 }}>
          <Table stickyHeader>
            <TableHead>
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
                      {row.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.lastModified}
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
                      onClick={() => navigate(`/estimates/edit/${row.id}`)}
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
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>
    </Box>
  );
}
