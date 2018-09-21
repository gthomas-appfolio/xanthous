import PropTypes from 'prop-types';
import React from 'react';
import styles from './Callout.scss';

class Callout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    background: PropTypes.string,
    placement: PropTypes.oneOf([
      'top',
      'bottom',
      'left',
      'right'
    ])
  };

  static defaultProps = {
    className: '',
    color: 'primary',
    background: 'light',
    placement: 'bottom'
  };

  render() {
    const { background, children, className, color, placement, ...props } = this.props;

    return (
      <div
        className={`callout ${styles.callout} text-${color} m${placement[0]}-5 ${className}`}
        {...props}
      >
        <span className={`callout-arrow ${styles.arrow} ${styles[placement]} bg-${background}`} />
        <div className={`${styles.body} bg-${background} text-dark p-3`}>
          {children}
        </div>
      </div>
    );
  }
}

export default Callout;
