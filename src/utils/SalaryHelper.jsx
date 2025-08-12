export const salaryColumn = () => [
  {
    name: "S NO",
    selector: (row, index) => index + 1,
  },
  {
    name: "EMP ID",
    selector: (row) => row.employeeId?.employeeId || "N/A", // make sure it's populated
    sortable: true,
  },
  {
    name: "SALARY",
    selector: (row) => row.salary,
    sortable: true,
  },
  {
    name: "ALLOWANCE",
    selector: (row) => row.allowances,
  },
  {
    name: "DEDUCTION",
    selector: (row) => row.deductions,
  },
  {
    name: "TOTAL",
    selector: (row) => row.netSalary,
  },
  {
    name: "PAY DATE",
    selector: (row) =>
      row.payDate ? new Date(row.payDate).toLocaleDateString("en-GB") : "N/A",
  },
];
