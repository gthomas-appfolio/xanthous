import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import Popover from './Popover';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';

let count = 0;

function getID() {
  return `help-bubble-${count++}`; // eslint-disable-line no-plusplus
}

const style = {
  cursor: 'pointer'
};

class HelpBubble extends React.Component {
  constructor(props) {
    super(props);

    this.id = getID();

    this.state = {
      isOpen: false
    };
  }

  toggle = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  // TODO: remove close and set Popover.toggle to this.toggle once we bump to reactstrap v5
  // Fixes https://github.com/reactstrap/reactstrap/issues/465
  close = () => {
    setTimeout(() => {
      this.setState({ isOpen: false });
    });
  };

  render() {
    const { title, children, className, ...other } = this.props;

    return (
      <span className={className} style={style}>
        <Icon
          name="question-circle"
          onClick={e => this.toggle(e)}
          id={this.id}
          className="text-primary"
        />
        <Popover
          isOpen={this.state.isOpen}
          toggle={this.close}
          target={this.id}
          {...other}
        >
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverBody>{children}</PopoverBody>
        </Popover>
      </span>
    );
  }
}

HelpBubble.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.any
};

export default HelpBubble;
