import React from 'react';
import Button from 'components/Button/Button';
import './DropDown.scss';

const DropDown = ({ dropDownOptions, visible, title, type, dropDownFn, highlight }) => {
  const renderCheckBoxOptions = type === 'checkbox' ? (
    dropDownOptions.map(option => (
    <div className="checkbox-container" type="submit" onClick={() => dropDownFn(option)} role="presentation">
      { highlight.includes(option) ? <i className="far fa-check-square" /> : <i className="far fa-square" /> }
      <div className="checkbox-label" style={{ marginLeft: '10px' }}>{option}</div>
    </div>
    ))) : null;

  const renderSingleOptions = type === 'single' ? (
    dropDownOptions.map(option => (
    <div className="button-container">
      <Button text={option} type="submit" clicked={highlight === option} onPress={() => dropDownFn(option)} className="btn-dropdown" />
    </div>
  ))) : null;

  return (
    <div className={visible ? "dropdown show" : "dropdown hide"}>
      <div className="dropdown-title">{title}</div>
      <div className={type === 'checkbox' ? "d-block" : "d-flex"}>
        {renderCheckBoxOptions}
        {renderSingleOptions}
      </div>
    </div>
  )
}

export default DropDown;
