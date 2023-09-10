import React from 'react'
import './select.scss'
import {AiFillCaretDown} from 'react-icons/ai'
const Select = ({ options, selectedOption, onSelect }: any) => {
  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find((option: any) => option.value === selectedValue);
    onSelect(selectedOption);
  };
  return (
    <div className="select">
      <div className="select__list">
      <span className='select__list-item'>selected</span>
      </div>
      <div className="select-icon"><AiFillCaretDown /></div>
    </div>
  )
}

export default Select