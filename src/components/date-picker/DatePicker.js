import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
export default function DatePicker({ placeholder, rest }) {
  let inputProps = {
    placeholder: placeholder,
  };
  return <Datetime inputProps={inputProps} {...rest} />;
}
