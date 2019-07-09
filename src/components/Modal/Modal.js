import React from 'react';
import Pie from 'components/Chart/Pie';
import './Modal.scss';
import Property from './Property/Property';

const Modal = (props) => {
  const { details, onClose, data, renderSimilar } = props;
	return (
   <div className="modal-wrapper">
     <div className="modal-container">
       <i className="fas fa-times close-icon" onClick={onClose} onKeyDown={onClose} role="presentation" />
       <Property listing={details} data={data} renderSimilar={renderSimilar} />
       <div className="property-header fw-bold">Similar Properties</div>
       <div className="similar-property-container">
          {renderSimilar()}
        </div>
        <div className="property-header fw-bold">Breakdown of your Search in the Area</div>
        <div className="text-center">
          <Pie pieData={data} />
        </div>
      </div>
     </div>
	);
};

export default Modal;
