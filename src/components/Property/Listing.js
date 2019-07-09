import React from 'react';
import './Listing.scss';

const Listing = ({ details, className, onEnter, onLeave, loadModal }) => {
  return (
    <div
      className={`listing-container ${className}`}
      onMouseOver={onEnter ? () => onEnter(details) : null}
      onFocus={onEnter ? () => onEnter(details) : null}
      onMouseLeave={onLeave}
      role="presentation"
      onClick={loadModal ? () => loadModal(details) : null}>
      <div className="listing-image-container">
        <img src={details.image} alt='Not found!' className="listing-image"/>
      </div>
      <div className="listing-main">
        <span className="listing-price listing-details">€{details.price}</span>
        <span className="listing-info listing-details">{details.beds} bds</span>
        <span className="listing-info listing-details">{details.baths} ba</span>
        <span className="listing-info listing-details">{details.sqm} sqm</span>
      </div>
        <div className="listing-address">{details.address}</div>
    </div>
  )
}

export default Listing;
