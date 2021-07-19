import PropTypes from 'prop-types';
export default (componentName, defaultLocale) => (function (Component) {
    const ComponentWithStatics = Component;
    return _a = class extends Component {
            getLocale() {
                const { antLocale } = this.context;
                const localeFromContext = antLocale && antLocale[componentName];
                const localeFromProps = this.props.locale || {};
                return Object.assign({}, defaultLocale, (localeFromContext || {}), localeFromProps);
            }
        },
        _a.propTypes = ComponentWithStatics.propTypes,
        _a.defaultProps = ComponentWithStatics.defaultProps,
        _a.contextTypes = Object.assign({}, (ComponentWithStatics.context || {}), { antLocale: PropTypes.object }),
        _a;
    var _a;
});
