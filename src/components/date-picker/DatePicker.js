import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
export default function DatePicker({ disabled, required, placeholder, ...rest }) {
  let inputProps = {
    placeholder: placeholder,
    disabled: disabled,
    required: required,
  };
  return <Datetime inputProps={inputProps} timeFormat={false} {...rest} />;
}
