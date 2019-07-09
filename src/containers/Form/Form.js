import React from 'react';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import DropDown from 'components/Form/DropDown/DropDown';
import './Form.scss';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = ({
      show: ''
    });
  }

  renderFilters = () => {
    const { show } = this.state;
    const { onChangeBeds, onChangeBaths, bedsSelected, bathsSelected, typeSelected, onChangeType } = this.props;

    const filters = [
      { text: "Home Type", dropType: 'checkbox', dropDownHighlight: typeSelected, dropDownFn: onChangeType, dropDownOptions: ['Terraced', 'Detached', 'Semi-Detached', 'Apartment'] },
      { text: "Beds", dropType: 'single', dropDownHighlight: bedsSelected, dropDownFn: onChangeBeds, dropDownOptions: ['Any', 1, 2, 3, 4] },
      { text: "Baths", dropType: 'single', dropDownHighlight: bathsSelected, dropDownFn: onChangeBaths, dropDownOptions: ['Any', 1, 2, 3] },
    ];

    return filters.map(filter => (
      <div className="position-relative"
        onMouseEnter={() => this.setState({ show: filter.text })}
        onMouseLeave={() => this.setState({ show: '' })}
        >
        <Button
          text={filter.text}
          type='button'
          selected={filter.dropDownHighlight > 0 ? filter.dropDownHighlight : ''}
          onPress={() => this.setState({ show: filter.text })}
          />
          <DropDown dropDownOptions={filter.dropDownOptions} highlight={filter.dropDownHighlight} dropDownFn={filter.dropDownFn} type={filter.dropType} title={filter.text} visible={show === filter.text} />
      </div>
    ));
  }

  render() {
    const { filterData, onChangeText, resetForm, search } = this.props;
    return (
      <form className="form-wrapper" onSubmit={filterData}>
        <div className="d-flex flex-row form-container">
          <Input
            type='input'
            value={search}
            icon
            onChange={onChangeText} />
          {this.renderFilters()}
          <Button onPress={resetForm} text="Reset"/>
        </div>
      </form>
    )
  }
}

export default SearchForm;
