import React from 'react';
import './Input.scss';

const Input = (props) => {
	const { className, type, placeholder, value, onChange, icon } = props;
	const elClassName = `form-control ${className}`;

	return icon ? (
    <div className='flex form-group'>
      <input
			className={elClassName}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
    <i className='fas fa-search form-icon' />
    </div>
  ) : (
		<input
			className={elClassName}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default Input;
