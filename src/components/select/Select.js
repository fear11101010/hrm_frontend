import { Form } from "react-bootstrap";
import "./select.css";
import styles from "./style.module.css";
import {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'

function Select(props) {
  const { options, onChange, placeholder,size,type,value } = props;
  const [selectedOption, setSelectedOption] = useState(value??'');
  const [isOpen, setIsOpen] = useState(false);
  const dropDownContainerRef = useRef(null);
  const dropDownRef = useRef(null);
  useEffect(()=>{
    console.log(value);
    setSelectedOption(value);
    function onBodyClick(e) {
      // setIsOpen(false);
      console.log(e.target.parentElement.parentElement)
      if(e.target.parentElement.parentElement.classList.contains('custom-dropdown')){
        return;
      }
      // alert(1)
      ReactDOM.findDOMNode(dropDownContainerRef.current).setAttribute('aria-expanded', "false");
      ReactDOM.findDOMNode(dropDownRef.current).setAttribute('aria-expanded', "false");
      ReactDOM.findDOMNode(dropDownRef.current).classList.remove('show');
    }
    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    }
  },[value])
  /*const resizeDropDownPosition = () =>{
    if(isOpen){
      const rect = ReactDOM.findDOMNode(dropDownContainerRef?.current).getBoundingClientRect();
      const bodyHeight = document.body.getBoundingClientRect().height;
      const {y,height,bottom} = ReactDOM.findDOMNode(dropDownRef?.current).getBoundingClientRect();
      const bottomDis = y+height
      console.log(rect,bottomDis,bodyHeight,(bodyHeight-height)/2)
      if(bottomDis>bodyHeight){
        if(height>rect.top){
          if(height>bodyHeight){
            dropDownRef.current.style.top = `-${y-rect.height}px`
          } else {
            dropDownRef.current.style.top = `-${y-rect.height-((bodyHeight-height)/2)}px`
          }
        }else{
          dropDownRef.current.style.top = ``
        }
      } else{
        dropDownRef.current.style.top = ``
      }
      console.log({y,height,bottom})
    }
  }*/
  const showHideDropDown = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(ReactDOM.findDOMNode(dropDownContainerRef.current).getAttribute('aria-expanded')==='false'){
      document.querySelectorAll('.custom-dropdown[aria-expanded="true"]').forEach(elem=>{
        elem.setAttribute('aria-expanded', "false");
        elem.querySelectorAll(".custom-dropdown-list").item(0).classList.remove('show')
        elem.querySelectorAll(".custom-dropdown-list").item(0).setAttribute('aria-expanded', "false");
      })
      openOrCloseDropdown();
    } else{
      document.querySelectorAll('.custom-dropdown[aria-expanded="true"]').forEach(elem=>{
        elem.setAttribute('aria-expanded', "false");
        elem.querySelectorAll(".custom-dropdown-list").item(0).classList.remove('show')
        elem.querySelectorAll(".custom-dropdown-list").item(0).setAttribute('aria-expanded', "false");
      })
    }

  }
  const openOrCloseDropdown=()=>{
    if(ReactDOM.findDOMNode(dropDownContainerRef.current).getAttribute('aria-expanded')==='false'){
      console.log('equal: 1',ReactDOM.findDOMNode(dropDownContainerRef.current).getAttribute('aria-expanded'))
      ReactDOM.findDOMNode(dropDownContainerRef.current).setAttribute('aria-expanded', "true");
      ReactDOM.findDOMNode(dropDownRef.current).setAttribute('aria-expanded', "true");
      ReactDOM.findDOMNode(dropDownRef.current).classList.add('show');
      console.log('equal: 1',ReactDOM.findDOMNode(dropDownContainerRef.current).getAttribute('aria-expanded'))
    } else {
      ReactDOM.findDOMNode(dropDownContainerRef.current).setAttribute('aria-expanded', "false");
      ReactDOM.findDOMNode(dropDownRef.current).setAttribute('aria-expanded', "false");
      ReactDOM.findDOMNode(dropDownRef.current).classList.remove('show');
    }
  }
  const onHandleChange = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(v);
    setSelectedOption(v);
    // setIsOpen(!isOpen);
    openOrCloseDropdown();
    if (onChange) {
      onChange(v);
    }
  };
  return (
    <div className={"custom-dropdown "+props.className} ref={dropDownContainerRef}  aria-expanded="false" onClick={showHideDropDown}>
      <div className={`form-select ${size?'form-select-'+size:''} ${type?' form-control-'+type:' form-control'}`}>
        <Form.Select value={selectedOption?.value} className="form-select form-select-sm form-control-flush">
          <option value={selectedOption?.value}>{selectedOption?.label}</option>
        </Form.Select>
        <div className="selected-option">{selectedOption?.label??placeholder}</div>
        <div ref={dropDownRef} className={`custom-dropdown-list ${isOpen ? "show" : ""}`} aria-expanded="false">
          <ul>
            {options?.map((option,i) => (
              <li key={`${option.value}_${option.label}_${i}`}>
                <a href="#" style={{whiteSpace:'nowrap'}} onClick={(e) => onHandleChange(e, option)}>
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
