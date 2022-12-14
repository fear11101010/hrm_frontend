import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
export default function DatePicker({ disabled, required, placeholder, value, ...rest }) {
  let inputProps = {
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    value: value,
  };
  return <Datetime inputProps={inputProps} timeFormat={false} closeOnSelect {...rest} />;
}
