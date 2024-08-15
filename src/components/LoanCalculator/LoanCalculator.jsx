import React, { useState } from "react";

// @material-ui core components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// @mui material components
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

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
  const [age, setAge] = useState(selectData.age[0]);

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

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };

  const formatResultNumber = (value) => {
    return parseFloat(value)
      .toFixed(2) // Ensure two decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands
  };

  // Function to get the bank factor based on the bank name
  const getBankFactor = (bank) => {
    switch (bank.name) {
      case "BBVA":
      case "Scotiabank":
      case "Banamex":
        return 0.5;
      case "Banorte":
        return 0.55;
      case "HSBC":
      case "Santander":
        return 0.6;
      case "Banregio":
        return 0.43;
      default:
        return 0;
    }
  };

  const calculateValues = (bank) => {
    const bankFactor = getBankFactor(bank);
    const monthlyIncome = parseFloat(income.replace(/,/g, ""));
    const monthlyCommitment = parseFloat(commitment.replace(/,/g, ""));

    const paymentCapacity = monthlyIncome * bankFactor - monthlyCommitment;
    const maxLoanAmount = paymentCapacity / bank.paymentFactor;
    const monthlyPayment = paymentCapacity;
    const initialDisbursement = maxLoanAmount * 0.1;

    return {
      paymentCapacity: paymentCapacity.toFixed(2),
      maxLoanAmount: maxLoanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      initialDisbursement: initialDisbursement.toFixed(2),
    };
  };

  const borderBottom = {
    borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
      `${borderWidth[1]} solid ${light.main}`,
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
                          <FormField label="Nombre" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField label="Apellidos" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField label="Email" inputProps={{ type: "email" }} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            value={age}
                            options={selectData.age}
                            onChange={handleAgeChange}
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
                  <MDTypography variant="h5">Bancos</MDTypography>
                </MDBox>
                <MDTypography variant="button" color="text">
                  A continuación, puedes ver los bancos disponibles junto con sus condiciones y el
                  monto máximo de crédito que podrías obtener según tus ingresos y compromisos
                  actuales.
                </MDTypography>
              </MDBox>
              {income && commitment && (
                <MDBox pt={2} pb={3} px={3}>
                  {bankData
                    .filter((bank) => age >= bank.minimumAge)
                    .map((bank, index) => {
                      const {
                        paymentCapacity,
                        maxLoanAmount,
                        monthlyPayment,
                        initialDisbursement,
                      } = calculateValues(bank);

                      return (
                        <div key={index}>
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            flexDirection={{ xs: "column", sm: "row" }}
                          >
                            <MDBox
                              display="flex"
                              alignItems="center"
                              style={{
                                width: "100%",
                                overflowX: "hidden",
                              }}
                            >
                              <MDAvatar
                                src={bank.logo}
                                alt={`${bank.name} logo`}
                                variant="rounded"
                                sx={{
                                  width: 80, // Increase width size
                                  height: 80, // Increase height size
                                  display: { xs: "none", sm: "block" }, // Hide on extra small devices, show on small and up
                                }}
                              />
                              <MDBox
                                ml={2}
                                lineHeight={0}
                                style={{
                                  width: "100%",
                                }}
                              >
                                <MDTypography variant="h5" fontWeight="medium">
                                  {bank.name}
                                </MDTypography>
                                <MDBox p={0}>
                                  <MDBox width="100%" overflow="auto">
                                    <Table sx={{ minWidth: "32rem" }}>
                                      <TableBody>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Capacidad de pago considerada por el banco:
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              $ {formatResultNumber(paymentCapacity)}
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Monto máximo de crédito bancario:
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              $ {formatResultNumber(maxLoanAmount)}
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Mensualidad:
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              $ {formatResultNumber(monthlyPayment)}
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Desembolso Inicial:
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              $ {formatResultNumber(initialDisbursement)}
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Aforo
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              90%
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                        <TableRow>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            p={1}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              Tasa de Interés (Informativo):
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox
                                            component="td"
                                            textAlign="left"
                                            py={1}
                                            pr={1}
                                            pl={3}
                                            sx={borderBottom}
                                          >
                                            <MDTypography
                                              variant="body2"
                                              color="text"
                                              fontWeight="regular"
                                            >
                                              {bank.interestRate}
                                            </MDTypography>
                                          </MDBox>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </MDBox>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          </MDBox>{" "}
                          <br />
                          {/* {index < bankData.length - 1 && <Divider />} */}
                        </div>
                      );
                    })}
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default LoanCalculator;
