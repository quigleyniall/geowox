import React from 'react';
import Map from 'components/Map/Map';
import Form from 'containers/Form/Form'
import Listing from 'components/Property/Listing';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button'
import Pie from 'components/Chart/Pie';
import allData from 'data/data';
import Nav from 'components/Nav/Nav';
import './Home.scss';

class Home extends React.Component {
  constructor() {
    super();
    this.state = ({
      data: [],
      selectedProperty: {},
      modal: false,
      showPie: false,
      beds: 0,
      baths: 0,
      typeList: [
        'Terraced',
        'Detached',
        'Semi-Detached',
        'Apartment'
      ],
      search: 'Dublin'
    });
  }

  componentWillMount() {
    this.setState({ data: allData });
  }

  hoverListing = (hoveredProperty) => {
    this.setState({ hoveredProperty });
  }

  leaveListing = () => {
    this.setState({ hoveredProperty: false });
  }

  renderProperties = () => {
    const { data } = this.state;

    return data.length ? (
      data.map(property => (
        <Listing details={property} onEnter={this.hoverListing} loadModal={this.showModal} onLeave={this.leaveListing} />
      ))
    ) : (
      <div>No Property Found!</div>
    )
  }

  showModal = (selectedProperty) => {
    this.setState({ modal: true, selectedProperty });
  }

  closeModal = () => {
    this.setState({ modal: false });
  }

  showPie = () => {
    this.setState(prevState => ({
      showPie: !prevState.showPie
    }))
  }

  renderSimilar = () => {
    const { data, selectedProperty } = this.state;
    const filteredData = data.filter(property => property !== selectedProperty);
    const similarData = filteredData.slice(0, 3);
    return similarData.length ? (
      similarData.map(property => (
      <Listing details={property} loadModal={this.showModal} className="similar-listing" />
    ))
    ) : (
      <div>No Simliar Properties Found!</div>
    )
  }

  filterData = (e) => {
    e.preventDefault();
    this.submitFormData();
  }

  submitFormData = () => {
    const { beds, baths, typeList, search } = this.state;
    const filtered = allData.filter(property => {
      const searchFilter = property.address.includes(search.toUpperCase());
      const filterType = typeList.includes(property.type);
      const bathFilter = baths > 0 ? property.baths === baths : property.baths > 0;
      const bedsFilter = beds > 0 ? property.beds === beds : property.beds > 0;
      return bathFilter && bedsFilter && filterType && searchFilter;
    })
    this.setState({ data: filtered })
  }

  onChangeBeds = (beds) => {
    this.setState({ beds });
  }

  onChangeBaths = (baths) => {
    this.setState({ baths });
  }

  onChangeText = async (e) => {
    await this.setState({ search: e.target.value });
    this.submitFormData();
  }

  onChangeType = async (type) => {
    await this.setState(prevState => ({
      typeList: prevState.typeList.includes(type) ? (
        prevState.typeList.filter(types => types !== type)
      ) : (
        prevState.typeList.concat(type)
      )
    }));
    this.submitFormData();
  }

  resetForm = () => {
    this.setState({
      baths: 0,
      beds: 0,
      typeList: [
        'Terraced',
        'Detached',
        'Semi-Detached',
        'Apartment'
      ],
      search: 'Dublin'
    })
  }

  render() {
    const { data, selectedProperty, hoveredProperty, modal, showPie, beds, baths, typeList, search } = this.state;
    return (
      <div className="wrapper">
        <Nav />
        { modal ? <Modal onClose={this.closeModal} renderSimilar={this.renderSimilar} data={data} details={selectedProperty} /> : null }
        <div className="main-section">
          <Form
            filterData={this.filterData}
            resetForm={this.resetForm}
            onChangeBeds={this.onChangeBeds}
            bedsSelected={beds}
            bathsSelected={baths}
            onChangeType={this.onChangeType}
            typeSelected={typeList}
            onChangeBaths={this.onChangeBaths}
            onChangeText={this.onChangeText}
            search={search}
          />
          <div className="d-flex h-100">
            <div className="left-section">
              <div className="results">
                <span className="results-number">{data.length === 1 ? `${data.length} result found` : `${data.length} results found`}</span>
                { data.length ? <Button text="View Breakdown of Results" onPress={this.showPie} /> : null }
                { showPie && data.length ? <Pie pieData={data} /> : null }
              </div>
              <div className="listings-container">
                {this.renderProperties()}
              </div>
            </div>
            <div className="map-container">
              <Map data={data} loadModal={this.showModal} showInfoWindow={hoveredProperty} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
