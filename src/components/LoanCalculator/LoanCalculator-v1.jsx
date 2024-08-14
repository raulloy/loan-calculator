import React, { useState } from "react";

// @material-ui core components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

// @mui material components
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React components
import { bankData } from "./data";

function LoanCalculator() {
  const [income, setIncome] = useState("");
  const [commitment, setCommitment] = useState("");

  // Function to format numbers with comma thousand separator
  const formatNumberWithCommas = (value) => {
    const numberValue = value.replace(/\D/g, ""); // Remove any non-digit characters
    return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
  };

  const handleIncomeChange = (event) => {
    const formattedValue = formatNumberWithCommas(event.target.value);
    setIncome(formattedValue);
  };

  const handleCommitmentChange = (event) => {
    const formattedValue = formatNumberWithCommas(event.target.value);
    setCommitment(formattedValue);
  };

  return (
    <BaseLayout>
      <MDBox mt={1}>
        <Grid container>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card id="basic-info" sx={{ overflow: "visible" }}>
                    <MDBox p={3}>
                      <MDTypography variant="h5">Compra Fácil</MDTypography>
                    </MDBox>
                    <MDBox component="form" pb={3} px={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField label="Nombre" placeholder="Raul" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField label="Apellidos" placeholder="Loyola" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            label="Email"
                            placeholder="example@email.com"
                            inputProps={{ type: "email" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            defaultValue={1}
                            options={selectData.age}
                            renderInput={(params) => (
                              <FormField
                                {...params}
                                label="Edad"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            label="Ingreso Mensual"
                            placeholder="$0.00"
                            value={`$${income}`}
                            onChange={handleIncomeChange}
                            inputProps={{ type: "text" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            label="Comprometido Mensual"
                            placeholder="$0.00"
                            value={`$${commitment}`}
                            onChange={handleCommitmentChange}
                            inputProps={{ type: "text" }}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Card id="accounts">
              <MDBox p={3} lineHeight={1}>
                <MDBox mb={1}>
                  <MDTypography variant="h5">Banks</MDTypography>
                </MDBox>
                <MDTypography variant="button" color="text">
                  Here you can see the available banks and their conditions.
                </MDTypography>
              </MDBox>
              <MDBox pt={2} pb={3} px={3}>
                {bankData.map((bank, index) => (
                  <div key={index}>
                    <MDBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <MDBox display="flex" alignItems="center">
                        <MDAvatar src={bank.logo} alt={`${bank.name} logo`} variant="rounded" />
                        <MDBox ml={2} lineHeight={0}>
                          <MDTypography variant="h5" fontWeight="medium">
                            {bank.name}
                          </MDTypography>
                          <MDTypography variant="button" color="text">
                            {`Interest Rate: ${bank.interestRate}`}
                          </MDTypography>
                          <MDTypography variant="button" color="text">
                            {`Payment Factor: ${bank.paymentFactor}`}
                          </MDTypography>
                          <MDTypography variant="button" color="text">
                            {`Minimum Age: ${bank.minimumAge}`}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                    {index < bankData.length - 1 && <Divider />}
                  </div>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default LoanCalculator;
