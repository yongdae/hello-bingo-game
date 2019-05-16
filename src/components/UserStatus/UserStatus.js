import React, {Component} from 'react';
import {Header, Icon} from "semantic-ui-react";

class UserStatus extends Component {
  render() {
    const {icon, name} = this.props;

    return (
        <Header as='h2' icon textAlign='center'>
          <Icon name={icon} circular/>
          <Header.Content>{name}</Header.Content>
        </Header>
    );
  }
}

export default UserStatus;