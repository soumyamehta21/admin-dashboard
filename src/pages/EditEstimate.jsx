import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import AddEstimate from "./AddEstimate";
import { useDispatch, useSelector } from "react-redux";
import { updateEstimate } from "../redux/slices/estimatesSlice";

export default function EditEstimate() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { items: estimates } = useSelector(state => state.estimates);
  
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedEstimate = estimates.find(
      (estimate) => estimate.id === parseInt(id)
    );
    
    if (fetchedEstimate) {
      // Use the actual estimate data if it has sections, otherwise create default structure
      const detailedEstimate = {
        ...fetchedEstimate,
        sections: fetchedEstimate.sections || [
          {
            id: 1,
            title: `Section for ${fetchedEstimate.project}`,
            expanded: true,
            items: [
              {
                id: 1,
                title: "Item 1",
                description: "Description for item 1",
                unit: "hrs",
                quantity: "10",
                price: "50",
                margin: "15",
                total: 575,
              },
            ],
          },
        ],
      };
      
      setEstimate(detailedEstimate);
    }
    
    setLoading(false);
  }, [id, estimates]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!estimate) {
    return <Box>Estimate not found</Box>;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color="text.main"
        sx={{ fontSize: "1.5rem" }}
      >
        {t("editEstimates")}
      </Typography>
      
      {/* Pass the estimate data to AddEstimate component */}
      <AddEstimate isEditing={true} estimateData={estimate} />
    </Box>
  );
}
