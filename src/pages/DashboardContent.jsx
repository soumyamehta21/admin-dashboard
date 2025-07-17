import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  PersonOutline,
  AttachMoneyOutlined,
  AccessTimeOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const statsCards = ({ t }) => [
  {
    title: t("totalUser"),
    value: "40,689",
    change: t("upFromYesterday", { percentage: "8.5%" }),
    trend: "up",
    icon: <PersonOutline />,
    color: "#4880ff",
    bgColor: "#e8f0ff",
  },
  {
    title: t("totalOrder"),
    value: "10293",
    change: t("upFromPastWeek", { percentage: "1.3%" }),
    trend: "up",
    icon: <LocalMallOutlined />,
    color: "#ffa726",
    bgColor: "#fff8e1",
  },
  {
    title: t("totalSales"),
    value: "$89,000",
    change: t("downFromYesterday", { percentage: "4.3%" }),
    trend: "down",
    icon: <AttachMoneyOutlined />,
    color: "#66bb6a",
    bgColor: "#e8f5e8",
  },
  {
    title: t("totalPending"),
    value: "2040",
    change: t("upFromYesterday", { percentage: "1.8%" }),
    trend: "up",
    icon: <AccessTimeOutlined />,
    color: "#ef5350",
    bgColor: "#ffebee",
  },
];

const chartData = [
  { name: "5K", value: 20 },
  { name: "10K", value: 32 },
  { name: "15K", value: 45 },
  { name: "20K", value: 35 },
  { name: "25K", value: 52 },
  { name: "30K", value: 40 },
  { name: "35K", value: 48 },
  { name: "40K", value: 60 },
  { name: "45K", value: 55 },
  { name: "50K", value: 70 },
  { name: "55K", value: 65 },
  { name: "60K", value: 85 },
  { name: "65K", value: 75 },
  { name: "70K", value: 90 },
  { name: "75K", value: 80 },
  { name: "80K", value: 95 },
  { name: "85K", value: 88 },
  { name: "90K", value: 75 },
  { name: "95K", value: 82 },
  { name: "100K", value: 78 },
];

const tableData = [
  {
    id: 1,
    product: "Apple Watch",
    image: "https://i.pravatar.cc/40?img=1",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12.53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    product: "iPhone 14",
    image: "https://i.pravatar.cc/40?img=2",
    location: "1234 Tech Street",
    dateTime: "11.09.2019 - 10.30 AM",
    piece: 156,
    amount: "$89,500",
    status: "Pending",
  },
  {
    id: 3,
    product: "MacBook Pro",
    image: "https://i.pravatar.cc/40?img=3",
    location: "5678 Innovation Ave",
    dateTime: "10.09.2019 - 3.45 PM",
    piece: 89,
    amount: "$125,000",
    status: "Delivered",
  },
];

export default function DashboardContent() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color="text.main"
        sx={{ fontSize: "1.5rem" }}
      >
        {t("dashboard")}
      </Typography>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: 3,
          mb: 4,
          width: "100%",
          "@media (max-width: 1200px)": {
            gridTemplateColumns: "auto auto auto",
          },
          "@media (max-width: 900px)": {
            gridTemplateColumns: "auto auto",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "auto",
          },
        }}
      >
        {statsCards({ t }).map((card, index) => (
          <Card
            key={index}
            sx={{
              p: 2.5,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
              width: "100%",
              height: "auto",
            }}
          >
            <CardContent sx={{ p: "0 !important", height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={1}
                  marginBottom={"-8px"}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "14px" }}
                  >
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      backgroundColor: card.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.color,
                      fontSize: "28px",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>

                <Box mb={1.5}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.main"
                    sx={{
                      fontSize: "32px",
                      lineHeight: 1.2,
                      marginTop: "0px",
                      marginBottom: "16px",
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  {card.trend === "up" ? (
                    <TrendingUp sx={{ fontSize: 16, color: "success.main" }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 16, color: "error.main" }} />
                  )}
                  <Typography
                    variant="caption"
                    color={card.trend === "up" ? "success.main" : "error.main"}
                    sx={{ fontSize: "12px" }}
                  >
                    {card.change}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card
        sx={{
          mb: 4,
          backgroundColor: "background.paper",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="bold" color="text.main">
              {t("salesDetails")}
            </Typography>
            <FormControl size="small">
              <Select
                defaultValue="october"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="october">{t("october")}</MenuItem>
                <MenuItem value="november">{t("november")}</MenuItem>
                <MenuItem value="december">{t("december")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4880ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4880ff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke={theme.palette.mode === "dark" ? "#374151" : "#f8f9fa"}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#4880ff",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  labelStyle={{ color: "white" }}
                  formatter={(value) => [`${value}%`, "Sales"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4880ff"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={{
                    fill: "#4880ff",
                    strokeWidth: 3,
                    stroke: "#ffffff",
                    r: 5,
                    style: {
                      filter: "drop-shadow(0 2px 4px rgba(72, 128, 255, 0.3))",
                    },
                  }}
                  activeDot={{
                    r: 7,
                    fill: "#4880ff",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    style: {
                      filter: "drop-shadow(0 2px 8px rgba(72, 128, 255, 0.5))",
                    },
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
      <Card
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="bold" color="text.main">
              {t("table")}
            </Typography>
            <FormControl size="small">
              <Select
                defaultValue="october"
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="october">{t("october")}</MenuItem>
                <MenuItem value="november">{t("november")}</MenuItem>
                <MenuItem value="december">{t("december")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("productName")}</TableCell>
                  <TableCell>{t("location")}</TableCell>
                  <TableCell>{t("dateTime")}</TableCell>
                  <TableCell>{t("piece")}</TableCell>
                  <TableCell>{t("amount")}</TableCell>
                  <TableCell>{t("status")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={row.image}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body2" color="text.main">
                          {row.product}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.dateTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.main">
                        {row.piece}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.main"
                      >
                        {row.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(row.status.toLowerCase().replace(" ", ""))}
                        size="small"
                        sx={{
                          backgroundColor:
                            row.status === "Delivered"
                              ? "#e8f5e8"
                              : row.status === "Pending"
                              ? "#fff3e0"
                              : "#f5f5f5",
                          color:
                            row.status === "Delivered"
                              ? "#2e7d32"
                              : row.status === "Pending"
                              ? "#f57c00"
                              : "#666",
                          fontWeight: 500,
                          fontSize: "12px",
                          height: "24px",
                          borderRadius: "12px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
