'use strict';

import React from 'react';
import MaskedInput from 'react-maskedinput';
import * as RegexUtils from '../../../utils/RegexUtils';

var id_complement = (new Date()).getTime().toString().concat('_');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _year_dropdown = require('./year_dropdown');

var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

var _month_dropdown = require('./month_dropdown');

var _month_dropdown2 = _interopRequireDefault(_month_dropdown);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DROPDOWN_FOCUS_CLASSNAMES = ['react-datepicker__year-select', 'react-datepicker__month-select'];

var isDropdownSelect = function isDropdownSelect() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classNames = (element.className || '').split(/\s+/);
  return !!(0, _find2.default)(DROPDOWN_FOCUS_CLASSNAMES, function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]).isRequired,
    dropdownMode: _react2.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: _react2.default.PropTypes.object,
    excludeDates: _react2.default.PropTypes.array,
    filterDate: _react2.default.PropTypes.func,
    fixedHeight: _react2.default.PropTypes.bool,
    highlightDates: _react2.default.PropTypes.array,
    includeDates: _react2.default.PropTypes.array,
    locale: _react2.default.PropTypes.string,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    monthsShown: _react2.default.PropTypes.number,
    onClickOutside: _react2.default.PropTypes.func.isRequired,
    onDropdownFocus: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func.isRequired,
    openToDate: _react2.default.PropTypes.object,
    peekNextMonth: _react2.default.PropTypes.bool,
    scrollableYearDropdown: _react2.default.PropTypes.bool,
    selected: _react2.default.PropTypes.object,
    selectsEnd: _react2.default.PropTypes.bool,
    selectsStart: _react2.default.PropTypes.bool,
    showMonthDropdown: _react2.default.PropTypes.bool,
    showWeekNumbers: _react2.default.PropTypes.bool,
    showYearDropdown: _react2.default.PropTypes.bool,
    startDate: _react2.default.PropTypes.object,
    todayButton: _react2.default.PropTypes.string,
    utcOffset: _react2.default.PropTypes.number
  },

  mixins: [require('react-onclickoutside')],

  defaultProps: {
    onDropdownFocus: function onDropdownFocus() {}
  },

  getDefaultProps: function getDefaultProps() {
    return {
      utcOffset: _moment2.default.utc().utcOffset(),
      monthsShown: 1
    };
  },
  getInitialState: function getInitialState() {
    return {
      date: this.localizeMoment(this.getDateInView()),
      selectingDate: null,
      selectingTime: null
    };
  },
  componentDidMount : function componentDidMount(){
    if(this.props.selected){
       this.setState({
        date: this.localizeMoment(this.props.selected)
      });
       this.state.date = this.localizeMoment(this.props.selected);
       this.setTimeByDate();
    }
  },

  setTimeByDate : function setTimeByDate(){
    if(this.state.date != null){
      var dateTime = '';
      var date = this.state.date;
      var hour = date.hour().toString();
      var minutes = date.minute().toString();
      if(hour.length == 1){
        hour = '0'.concat(hour);
      }
      if(minutes.length == 1){
        minutes = '0'.concat(minutes);
      }
      dateTime = dateTime.concat(hour);
      dateTime = dateTime.concat(':');
      dateTime = dateTime.concat(minutes);
      this.setState({selectingTime:dateTime});
    }else{
      this.setState({selectingTime:null});
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.selected && !(0, _date_utils.isSame)(nextProps.selected, this.state.date)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      });
      this.state.date = this.localizeMoment(nextProps.selected);
    } else if (nextProps.openToDate && !(0, _date_utils.isSame)(nextProps.openToDate, this.props.openToDate)) {
      this.setState({
        date: this.localizeMoment(nextProps.openToDate)
      });
      this.state.date = this.localizeMoment(nextProps.openToDate);
    }
    this.setTimeByDate();
  },
  handleClickOutside: function handleClickOutside(event) {
    this.props.onClickOutside(event);
  },
  handleDropdownFocus: function handleDropdownFocus(event) {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus();
    }
  },
  getDateInView: function getDateInView() {
    var _props = this.props,
        selected = _props.selected,
        openToDate = _props.openToDate,
        utcOffset = _props.utcOffset;

    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
    var current = _moment2.default.utc().utcOffset(utcOffset);
    if (selected) {
      return selected;
    } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
      return openToDate;
    } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
      return openToDate;
    } else if (minDate && minDate.isAfter(current)) {
      return minDate;
    } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
      return openToDate;
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate;
    } else if (openToDate) {
      return openToDate;
    } else {
      return current;
    }
  },
  localizeMoment: function localizeMoment(date) {
    return date.clone().locale(this.props.locale || _moment2.default.locale());
  },
  increaseMonth: function increaseMonth() {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    });
  },
  decreaseMonth: function decreaseMonth() {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    });
  },
  handleDayClick: function handleDayClick(day, event) {
    day.set({hour : this._getSelectedHour(),minute : this._getSelectedMinute()});
    this.setState({date: day});
    this.props.onSelect(day, event);
  },
  _getSelectedHour: function _getSelectedHour(){
    var hours = 0;
    if(this.state.selectingTime != null){
      if(this.state.selectingTime.includes(':')){
      var res = this.state.selectingTime.split(':');
      hours = res[0].replace( /^\D+/g, '');
      hours = hours.replace( '_', '');
      if(hours.length == 1){
        hours = '0'.concat(hours);
      }
    }
    }
    return hours;
  },
  _getSelectedMinute: function _getSelectedMinute(){
    var minutes = 0;
    if(this.state.selectingTime != null){
      if(this.state.selectingTime.includes(':')){
        var res = this.state.selectingTime.split(':');
        minutes = res[1].replace( /^\D+/g, '');
        minutes = minutes.replace( '_', '');
        if(minutes.length == 1){
          minutes = '0'.concat(minutes);
        }
      }
    }
    return minutes;
  },
  handleDayMouseEnter: function handleDayMouseEnter(day) {
    this.setState({ selectingDate: day });
  },
  handleMonthMouseLeave: function handleMonthMouseLeave() {
    this.setState({ selectingDate: null });
  },
  changeYear: function changeYear(year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    });
  },
  changeMonth: function changeMonth(month) {
    this.setState({
      date: this.state.date.clone().set('month', month)
    });
  },
  header: function header() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.date;

    var startOfWeek = date.clone().startOf('week');
    var dayNames = [];
    if (this.props.showWeekNumbers) {
      dayNames.push(_react2.default.createElement(
        'div',
        { key: 'W', className: 'react-datepicker__day-name' },
        '#'
      ));
    }
    return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react2.default.createElement(
        'div',
        { key: offset, className: 'react-datepicker__day-name' },
        day.localeData().weekdaysMin(day)
      );
    }));
  },
  renderPreviousMonthButton: function renderPreviousMonthButton() {
    if ((0, _date_utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--previous',
      onClick: this.decreaseMonth });
  },
  renderNextMonthButton: function renderNextMonthButton() {
    if ((0, _date_utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--next',
      onClick: this.increaseMonth });
  },
  renderCurrentMonth: function renderCurrentMonth() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.date;

    var classes = ['react-datepicker__current-month'];
    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown');
    }
    return _react2.default.createElement(
      'div',
      { className: classes.join(' ') },
      date.format(this.props.dateFormat)
    );
  },
  renderYearDropdown: function renderYearDropdown() {
    var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.props.showYearDropdown || overrideHide) {
      return;
    }
    return _react2.default.createElement(_year_dropdown2.default, {
      dropdownMode: this.props.dropdownMode,
      onChange: this.changeYear,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      year: this.state.date.year(),
      scrollableYearDropdown: this.props.scrollableYearDropdown });
  },
  renderMonthDropdown: function renderMonthDropdown() {
    var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.props.showMonthDropdown) {
      return;
    }
    return _react2.default.createElement(_month_dropdown2.default, {
      dropdownMode: this.props.dropdownMode,
      locale: this.props.locale,
      onChange: this.changeMonth,
      month: this.state.date.month() });
  },
  renderTodayButton: function renderTodayButton() {
    var _this = this;

    if (!this.props.todayButton) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__today-button', onClick: function onClick(event) {
          var date = _moment();
          if (_this.props.timeEnabled){
            if(_this.props.utcOffset){
              date = _moment2.default.utc().utcOffset(_this.props.utcOffset);
            }            
          }else{
            if(_this.props.utcOffset){
              date = _moment2.default.utc().utcOffset(_this.props.utcOffset).startOf('date');
            }
          }
          _this.state.date = date;
          _this.setState({date : date});
          _this.setTimeByDate();
          return _this.props.onSelect(date, event);
        } },
      this.props.todayButton
    );
  },
  renderMonths: function renderMonths() {
    var monthList = [];
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthDate = this.state.date.clone().add(i, 'M');
      var monthKey = 'month-' + i;
      monthList.push(_react2.default.createElement(
        'div',
        { key: monthKey, className: 'react-datepicker__month-container' },
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker__header' },
          this.renderCurrentMonth(monthDate),
          _react2.default.createElement(
            'div',
            {
              className: 'react-datepicker__header__dropdown react-datepicker__header__dropdown--' + this.props.dropdownMode,
              onFocus: this.handleDropdownFocus },
            this.renderMonthDropdown(i !== 0),
            this.renderYearDropdown(i !== 0)
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-datepicker__day-names' },
            this.header(monthDate)
          )
        ),
        _react2.default.createElement(_month2.default, {
          day: monthDate,
          onDayClick: this.handleDayClick,
          onDayMouseEnter: this.handleDayMouseEnter,
          onMouseLeave: this.handleMonthMouseLeave,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          excludeDates: this.props.excludeDates,
          highlightDates: this.props.highlightDates,
          selectingDate: this.state.selectingDate,
          includeDates: this.props.includeDates,
          fixedHeight: this.props.fixedHeight,
          filterDate: this.props.filterDate,
          selected: this.props.selected,
          selectsStart: this.props.selectsStart,
          selectsEnd: this.props.selectsEnd,
          showWeekNumbers: this.props.showWeekNumbers,
          startDate: this.props.startDate,
          endDate: this.props.endDate,
          peekNextMonth: this.props.peekNextMonth,
          utcOffset: this.props.utcOffset })
      ));
    }
    return monthList;
  },
  _onChangeTime : function _onChangeTime(e){
    var time = e.target.value.replace( /^\D+/g, '');
    time = time.replace( '_', '');
    time = time.replace( ':', '');
    this.setState({selectingTime:e.target.value}); 
    this.state.selectingTime = e.target.value;
    if(time.length==4){
      var day = this.state.date;
      day.set({hour : this._getSelectedHour(),minute : this._getSelectedMinute()});       
      this.setState({date:day});
      this.state.date = day;
      this.props.onSelect(this.state.date, e);
    }
  },

  _onBlurTime : function _onBlurTime(e){
   
    this.props.onSelect(this.state.date, e);
  },

  _onKeyPressTime : function _onKeyPressTime(event){
    var selectingTime = this.state.selectingTime;
    var hours = '';
    var minutes = '';
    var regexHour = true;
    var regexMinutes = true;
    var regex = null;
    if(selectingTime == null){
      selectingTime = '';
    }
    if(selectingTime.includes(':')){
      var res = selectingTime.split(':');
      var hours = res[0].replace( /^\D+/g, '');
      hours = hours.replace( '_', '');

      var minutes = res[1].replace( /^\D+/g, '');
      minutes = minutes.replace( '_', '');
      if(hours.length < 2){
        hours = hours.concat(event.key);
        regexHour = RegexUtils.validateHour24Format(hours);
      } else if(minutes.length < 2){
        minutes = minutes.concat(event.key);
        regexMinutes = RegexUtils.validateMinutes(minutes);
      }
    }else{
      hours = selectingTime.replace( /^\D+/g, '');
      hours = hours.replace( '_', '');
      hours = hours.concat(event.key);
      regexHour = RegexUtils.validateHour24Format(hours);
    }
    if(!(regexHour && regexMinutes)){
      document.getElementById(this._getMaskedInputId()).value = this.state.selectingTime;
    }
  },
  renderTimeButton: function renderTimeButton() {
    var _this = this;
    if (!this.props.timeEnabled) {
      return <div/>;
    }
    return <div className='react-datepicker_time'><MaskedInput id={this._getMaskedInputId()} onBlur={this._onBlurTime} mask='11:11' placeholder='hh:mm' value={this.state.selectingTime} onKeyPress={this._onKeyPressTime} onChange={this._onChangeTime}/></div>;
  },



  _getMaskedInputId: function _getMaskedInputId(){
    return id_complement.concat('MaskedInput_id');
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker' },
      _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
      this.renderPreviousMonthButton(),
      this.renderNextMonthButton(),
      this.renderMonths(),
      this.renderTimeButton(),
      this.renderTodayButton()
    );
    document.getElementById(this._getMaskedInputId()).value = this.state.selectingTime;
  }
});

module.exports = Calendar;
