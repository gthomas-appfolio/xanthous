import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from './Button';
import ConfirmationButton from './ConfirmationButton';
import Col from './Col';
import Icon from './Icon';
import Row from './Row';
import Tooltip from './Tooltip';

let count = 0;

function getID() {
  return `hmf-${(count += 1)}`; // eslint-disable-line no-return-assign
}

export default class HasManyFieldsRow extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledReason: PropTypes.node,
    disabledReasonPlacement: PropTypes.string,
    onDelete: PropTypes.func,
    deletable: PropTypes.bool,
    deleteProps: PropTypes.object
  };

  static defaultProps = {
    disabledReasonPlacement: 'top',
    disabled: false,
    onDelete: noop,
    deletable: true
  };

  //eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.id = getID();
  }

  render() {
    const {
      children,
      className,
      disabledReason,
      onDelete,
      disabled,
      disabledReasonPlacement,
      deletable,
      deleteProps
    } = this.props;

    const classNames = classnames('mb-4', className);
    // The `disabled ? <Button> : <ConfirmationButton>` code works around Tooltips not show on `disabled` elements:

    const tooltip =
      disabled && disabledReason ? (
        <Tooltip placement={disabledReasonPlacement} target={this.id}>
          {disabledReason}
        </Tooltip>
      ) : null;

    const button = disabled ? (
      <Button
        id={this.id}
        color="danger"
        onClick={e => e.preventDefault()}
        outline
        className="p-2 disabled"
      >
        <Icon name="times-circle-o" size="lg" />
      </Button>
    ) : (
      <ConfirmationButton
        color="danger"
        confirmation="Delete"
        aria-label="Delete"
        outline
        onClick={onDelete}
        className="p-2"
        {...deleteProps}
      >
        <Icon name="times-circle-o" size="lg" />
      </ConfirmationButton>
    );

    return (
      <Row className={classNames} noGutters>
        <Col>{children}</Col>
        {deletable && (
          <Col xs="auto" className="js-delete-col pl-3 d-flex">
            {button}
            {tooltip}
          </Col>
        )}
      </Row>
    );
  }
}
