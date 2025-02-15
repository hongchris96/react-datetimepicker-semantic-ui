import React from 'react';
import '../style/DateTimeRange.css';
import Glyphicon from '@strongdm/glyphicon';
import PropTypes from 'prop-types';
import {addFocusStyle, darkTheme, lightTheme} from '../utils/StyleUtils';
import { Dropdown } from 'semantic-ui-react';

class MonthYearSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthFocus: false,
      yearFocus: false,
    };

    this.monthFocus = this.monthFocus.bind(this);
    this.yearFocus = this.yearFocus.bind(this);
    this.monthBlur = this.monthBlur.bind(this);
    this.yearBlur = this.yearBlur.bind(this);
  }

  createCalendarMonths(months) {
    return this.mapToOption(months);
  }

  createYears(years) {
    return this.mapToOption(years);
  }

  monthFocus() {
    this.setState({ monthFocus: true });
  }

  monthBlur() {
    this.setState({ monthFocus: false });
  }

  yearFocus() {
    this.setState({ yearFocus: true });
  }

  yearBlur() {
    this.setState({ yearFocus: false });
  }

  mapToOption(variableArray) {
    return variableArray.map(function(varInstance, i) {
      return <option key={i}>{varInstance}</option>;
    });
  }

  createGlyph(icon, onClickHandler, previous, next) {
    return (
      <Glyphicon
        glyph={icon}
        style={{ cursor: 'pointer', marginTop: "0.5em" }}
        onClick={() => onClickHandler(previous, next)}
      />
    );
  }

  render() {
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    let leftArrow = this.createGlyph(
      'chevron-left',
      this.props.changeMonthArrowsCallback,
      true,
      false,
    );
    let rightArrow = this.createGlyph(
      'chevron-right',
      this.props.changeMonthArrowsCallback,
      false,
      true,
    );
    let monthFocusStyle = {};
    monthFocusStyle = addFocusStyle(this.state.monthFocus, monthFocusStyle);
    let yearFocusStyle = {};
    yearFocusStyle = addFocusStyle(this.state.yearFocus, yearFocusStyle);
    return (
      <div className="monthYearContainer">
        <div className="multipleContentOnLine leftChevron">{leftArrow}</div>
        <div
          className="multipleContentOnLine"
          onFocus={this.monthFocus}
          onBlur={this.monthBlur}
          style={monthFocusStyle}
        >
            <Dropdown
                id={'MonthSelector_' + this.props.mode}
                value={this.props.months[this.props.month]}
                onChange={this.props.changeMonthCallback}
                style={theme}
                selection
                options={Object.keys(this.props.months).map((m) => {return {key: m, value: this.props.months[m], text: this.props.months[m]}})}
            />
        </div>
        <div
          className="multipleContentOnLine"
          onFocus={this.yearFocus}
          onBlur={this.yearBlur}
          style={yearFocusStyle}
        >
            <Dropdown
                id={'YearSelector_' + this.props.mode}
                value={this.props.year}
                onChange={this.props.changeYearCallback}
                style={theme}
                selection
                options={Object.keys(this.props.years).map((m) => {return {key: m, value: this.props.years[m], text: this.props.years[m]}})}
            />
        </div>
        <div className="multipleContentOnLine rightChevron">{rightArrow}</div>
      </div>
    );
  }
}

MonthYearSelector.propTypes = {
  months: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  changeMonthCallback: PropTypes.func.isRequired,
  changeYearCallback: PropTypes.func.isRequired,
  changeMonthArrowsCallback: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
export default MonthYearSelector;
