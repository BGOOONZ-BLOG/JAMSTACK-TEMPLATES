import React, {PropTypes, Component} from 'react';
import GregorianCalendar from 'gregorian-calendar';
import zhCN from './locale/zh_CN';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import {PREFIX_CLS} from './Constants';
import Header from './Header';

function noop () { return null; }

function zerofixed (v) {
  if (v < 10) return '0' + v;
  return v + '';
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.parseDateFromValue(props.value || new Date()),
      mode: props.mode,
    };
  }
  parseDateFromValue(value) {
    const date = new GregorianCalendar(this.props.locale);
    date.setTime(+value);
    return date;
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.parseDateFromValue(nextProps.value)
      });
    }
  }
  monthCellRender(value, locale) {
    const prefixCls = this.props.prefixCls;
    const month = value.getMonth();
    return <div className={`${prefixCls}-month`}>
      <div className={`${prefixCls}-value`}>
        {locale.format.shortMonths[month]}
      </div>
      <div className={`${prefixCls}-content`}>
        {this.props.monthCellRender(value)}
      </div>
    </div>;
  }
  dateCellRender(value) {
    const prefixCls = this.props.prefixCls;
    return <div className={`${prefixCls}-date`}>
      <div className={`${prefixCls}-value`}>
        {zerofixed(value.getDayOfMonth())}
      </div>
      <div className={`${prefixCls}-content`}>
        {this.props.dateCellRender(value)}
      </div>
    </div>;
  }
  setValue(value) {
    if (!('value' in this.props) && this.state.value !== value) {
      this.setState({ value });
    }
    this.props.onPanelChange(value, this.state.mode);
  }
  setType(type) {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      this.props.onPanelChange(this.state.value, mode);
    }
  }
  render() {
    const props = this.props;
    const {value, mode} = this.state;
    const {locale, prefixCls, style, className, fullscreen} = props;
    const type = (mode === 'year') ? 'month' : 'date';

    let cls = className || '';
    if (fullscreen) {
      cls += (' ' + prefixCls + '-fullscreen');
    }

    return (
      <div className={cls} style={style}>
        <Header
          fullscreen={fullscreen}
          type={type}
          value={value}
          locale={locale.lang}
          prefixCls={prefixCls}
          onTypeChange={this.setType.bind(this)}
          onValueChange={this.setValue.bind(this)}/>
        <FullCalendar
          {...props}
          Select={noop}
          locale={locale.lang}
          type={type}
          prefixCls={prefixCls}
          showHeader={false}
          value={value}
          monthCellRender={this.monthCellRender.bind(this)}
          dateCellRender={this.dateCellRender.bind(this)} />
      </div>
    );
  }
}

Calendar.propTypes = {
  monthCellRender: PropTypes.func,
  dateCellRender: PropTypes.func,
  fullscreen: PropTypes.bool,
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onPanelChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  monthCellRender: noop,
  dateCellRender: noop,
  locale: zhCN,
  fullscreen: true,
  prefixCls: PREFIX_CLS,
  onPanelChange: noop,
  mode: 'month',
};

export default Calendar;
