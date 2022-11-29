export const tableStylesBordered = {
  table: {
    style: {
      // border: "1px solid #e6e6e6",
      borderStyle: "solid",
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      borderBottomWidth: "1px",
      borderTopWidth: "1px",
      borderColor: "#e6e6e6",
      borderRadius: "4px",
    },
  },
  headRow: {
    style: {
      color: "f9fbfd",
      borderTopStyle: "solid",
      borderTopWidth: "0px",
      backgroundColor: "#f9fbfd",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
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
        // borderBottomLeftRadius: "4px",
        // borderBottomRightRadius: "4px",
      },
    },
  },
};
