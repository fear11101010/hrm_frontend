export const tableStyles = {
  table: {
    style: {
      border: "1px solid #e6e6e6",
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "0px",
      backgroundColor: "#EBF8FF",
    },
  },
  headCells: {
    style: {
      fontSize: "14px",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderColor: "#e6e6e6",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      backgroundColor: "#FFFFFF",
      "&:not(:last-of-type)": {
        borderColor: "#e6e6e6",
        borderRightStyle: "solid",
        borderRightWidth: "1px",
      },
    },
  },
};
