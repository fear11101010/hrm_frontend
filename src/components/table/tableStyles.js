export const tableStyles = {
  table: {
    style: {
      borderLeftWidth: "0px",
      borderRightWidth: "0px",
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
        borderRightWidth: "0px",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      backgroundColor: "#FFFFFF",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "0px",
      },
    },
  },
};
