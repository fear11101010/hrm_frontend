import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
export default function DatePicker(rest) {
  return <Datetime timeFormat={false} {...rest} />;
}
