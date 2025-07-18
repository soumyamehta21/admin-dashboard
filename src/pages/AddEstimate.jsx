import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function AddEstimate() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Sample Section",
      expanded: true,
      items: [
        {
          id: 1,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
        {
          id: 2,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
        {
          id: 3,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
      ],
    },
    {
      id: 2,
      title: "Sample Section",
      expanded: true,
      items: [
        {
          id: 4,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
        {
          id: 5,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
        {
          id: 6,
          title: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          total: 0,
        },
      ],
    },
  ]);

  // Calculate item total
  const calculateItemTotal = useCallback((quantity, price, margin) => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const mrg = parseFloat(margin) || 0;

    const baseTotal = qty * prc;
    const marginAmount = (baseTotal * mrg) / 100;
    return baseTotal + marginAmount;
  }, []);

  // Update item and recalculate totals
  const updateItem = (sectionId, itemId, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedItems = section.items.map((item) => {
            if (item.id === itemId) {
              const updatedItem = { ...item, [field]: value };

              // Recalculate total when quantity, price, or margin changes
              if (
                field === "quantity" ||
                field === "price" ||
                field === "margin"
              ) {
                updatedItem.total = calculateItemTotal(
                  field === "quantity" ? value : item.quantity,
                  field === "price" ? value : item.price,
                  field === "margin" ? value : item.margin
                );
              }

              return updatedItem;
            }
            return item;
          });

          return { ...section, items: updatedItems };
        }
        return section;
      })
    );
  };

  // Update section title
  const updateSectionTitle = (sectionId, title) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, title };
        }
        return section;
      })
    );
  };

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, expanded: !section.expanded };
        }
        return section;
      })
    );
  };

  // Add item to section
  const addItem = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const newItem = {
            id: Date.now(),
            title: "",
            description: "",
            unit: "",
            quantity: "",
            price: "",
            margin: "",
            total: 0,
          };
          return { ...section, items: [...section.items, newItem] };
        }
        return section;
      })
    );
  };

  // Remove item from section
  const removeItem = (sectionId, itemId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          };
        }
        return section;
      })
    );
  };

  // Calculate section total
  const getSectionTotal = (section) => {
    return section.items.reduce((sum, item) => sum + item.total, 0);
  };

  // Calculate overall totals
  const calculateTotals = () => {
    let subTotal = 0;
    let totalMargin = 0;

    sections.forEach((section) => {
      section.items.forEach((item) => {
        const qty = parseFloat(item.quantity) || 0;
        const prc = parseFloat(item.price) || 0;
        const mrg = parseFloat(item.margin) || 0;

        const baseAmount = qty * prc;
        const marginAmount = (baseAmount * mrg) / 100;
        subTotal += baseAmount;
        totalMargin += marginAmount;
      });
    });

    return {
      subTotal: subTotal.toFixed(2),
      totalMargin: totalMargin.toFixed(2),
      totalAmount: (subTotal + totalMargin).toFixed(2),
    };
  };

  const totals = calculateTotals();

  const handleSubmit = () => {
    console.log("Submitting estimate:", sections);
    navigate("/estimations");
  };

  const handleCancel = () => {
    navigate("/estimations");
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
        {t("addNewEstimates")}
      </Typography>

      <Paper
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          minHeight: "calc(100vh - 200px)",
          p: 0,
        }}
      >
        {/* Header Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 0.8fr 0.8fr 1fr 1fr 1fr 0.5fr",
            gap: 2,
            p: 2,
            backgroundColor: "background.default",
            borderBottom: "1px solid",
            borderColor: "divider",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("item")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("description")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("unit")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("quantity")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("price")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("margin")}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            {t("total")}
          </Typography>
          <Box></Box>
        </Box>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <Box key={section.id}>
            {/* Section Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr 0.8fr 0.8fr 1fr 1fr 1fr 0.5fr",
                gap: 2,
                p: 2,
                backgroundColor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "-8px",
                }}
              >
                <IconButton
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => toggleSection(section.id)}
                >
                  {section.expanded ? <Remove /> : <Add />}
                </IconButton>
                <TextField
                  size="small"
                  value={section.title}
                  onChange={(e) =>
                    updateSectionTitle(section.id, e.target.value)
                  }
                  variant="outlined"
                  sx={{
                    width: "150px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "background.default",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
              </Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  size="small"
                  value={getSectionTotal(section).toFixed(2)}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    width: "80px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "background.default",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
                <Typography variant="body1">$</Typography>
              </Box>
              <Box></Box>
            </Box>

            {/* Section Items */}
            <Collapse in={section.expanded}>
              <Box>
                {section.items.map((item, itemIndex) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1.5fr 0.8fr 0.8fr 1fr 1fr 1fr 0.5fr",
                      gap: 2,
                      p: 2,
                      pl: "48px", // Add left padding to align with section input
                      alignItems: "center",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:last-child": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TextField
                      size="small"
                      placeholder="Item Name"
                      value={item.title}
                      onChange={(e) =>
                        updateItem(section.id, item.id, "title", e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(
                          section.id,
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Unit"
                      value={item.unit}
                      onChange={(e) =>
                        updateItem(section.id, item.id, "unit", e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Quantity"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          section.id,
                          item.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Price"
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(section.id, item.id, "price", e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Margin"
                      type="number"
                      value={item.margin}
                      onChange={(e) =>
                        updateItem(
                          section.id,
                          item.id,
                          "margin",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Total"
                      value={item.total.toFixed(2)}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.default",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          "& fieldset": { border: "none" },
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => addItem(section.id)}
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          width: 24,
                          height: 24,
                          "&:hover": { backgroundColor: "grey.800" },
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                      {section.items.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={() => removeItem(section.id, item.id)}
                          sx={{
                            backgroundColor: "grey.400",
                            color: "white",
                            width: 24,
                            height: 24,
                            "&:hover": { backgroundColor: "grey.600" },
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}

        {/* Totals Section */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              gap: 1,
              maxWidth: "300px",
              ml: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                {t("subTotal")}
              </Typography>
              <Typography variant="body1">$ {totals.subTotal}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                {t("totalMargin")}
              </Typography>
              <Typography variant="body1">$ {totals.totalMargin}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" fontWeight="bold">
                {t("totalAmount")}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                $ {totals.totalAmount}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            p: 3,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
