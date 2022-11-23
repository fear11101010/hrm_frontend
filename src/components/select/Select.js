import { Form } from "react-bootstrap";
import "./select.css";
import styles from "./style.module.css";
import { useState } from "react";

function Select({ options, onChange, placeholder }) {
  const [selectedOption, setSelectedOption] = useState({ value: 10, label: "10 per page" });
  const [isOpen, setIsOpen] = useState(false);
  const onHandleChange = (e, v) => {
    e.preventDefault();
    console.log(v);
    setSelectedOption(v);
    setIsOpen(!isOpen);
    if (onChange) {
      onChange(v);
    }
  };
  return (
    <div className="custom-dropdown" aria-expanded={isOpen} onClick={(e) => setIsOpen(!isOpen)}>
      <div className="form-select form-select-sm form-control-flush">
        <Form.Select value={selectedOption.value} className="form-select form-select-sm form-control-flush">
          <option value={selectedOption.value}>{selectedOption.label}</option>
        </Form.Select>
        <div className="selected-option">{selectedOption.label}</div>
        <div className={`custom-dropdown-list ${isOpen ? "show" : ""}`} aria-expanded={isOpen}>
          <ul>
            {options?.map((option) => (
              <li key={`${option.value}_${option.label}`}>
                <a href="#" onClick={(e) => onHandleChange(e, option)}>
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/*<div className="choices" data-type="select-one" tabIndex="0" role="listbox" aria-haspopup="true"
                 aria-expanded="false">
                <div className="form-select form-select-sm form-control-flush"><select
                    className="form-select form-select-sm form-control-flush form-control"
                    data-choices="{&quot;searchEnabled&quot;: false}" hidden="" tabIndex="1" data-choice="active">
                    <option value="5 per page">5 per page</option>
                </select>
                    <div className="choices__list choices__list--single">
                        <div className="choices__item choices__item--selectable" data-item="" data-id="3"
                             data-value="5 per page" data-custom-properties="null" aria-selected="true">5 per page
                        </div>
                    </div>
                </div>
                <div className="choices__list dropdown-menu" aria-expanded="false">
                    <div className="choices__list" role="listbox">
                        <div className="choices__item dropdown-item choices__item--selectable"
                             data-select-text="Press to select" data-choice="" data-choice-selectable="" data-id="1"
                             data-value="5 per page" role="option" aria-selected="false">
                            5 per page
                        </div>
                        <div className="choices__item dropdown-item choices__item--selectable is-highlighted"
                             data-select-text="Press to select" data-choice="" data-choice-selectable="" data-id="2"
                             data-value="10 per page" role="option" aria-selected="true">
                            10 per page
                        </div>
                        <div className="choices__item dropdown-item choices__item--selectable"
                             data-select-text="Press to select" data-choice="" data-choice-selectable="" data-id="3"
                             data-value="All" role="option">
                            All
                        </div>
                    </div>
                </div>
            </div>*/}
    </div>
  );
}

export default Select;
