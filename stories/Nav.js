import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Nav, NavItem, NavLink } from '../src';
import { number } from '@kadira/storybook-addon-knobs';

const onClick = () => alert('Clicked!');

storiesOf('Nav', module)
  .addWithInfo('Tabs', () => {
    const activeTab = number('activeTab', 1);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink active={activeTab === 1} onClick={onClick}>
              Receivables
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 2} onClick={onClick}>
              Payables
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 3} onClick={onClick}>
              Bank Accounts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 4} onClick={onClick}>
              Journal Entries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 5} onClick={onClick}>
              GL Accounts
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  })
  .addWithInfo('Pills', () => {
    const activeTab = number('activeTab', 1);
    return (
      <div>
        <Nav pills>
          <NavItem>
            <NavLink active={activeTab === 1} onClick={onClick}>
              Receivables
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 2} onClick={onClick}>
              Payables
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 3} onClick={onClick}>
              Bank Accounts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 4} onClick={onClick}>
              Journal Entries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={activeTab === 5} onClick={onClick}>
              GL Accounts
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  });