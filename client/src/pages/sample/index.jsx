import React, { Component } from 'react';
import { Heading } from '@chakra-ui/core';
import SampleDashboard from '../dashboard';

export default class SamplePage extends Component {

  constructor(props) {
    super(props);
    this.id = +props.match.params.id;
    this.username = (SampleDashboard.myUsers.find((user) => (user.userId === this.id))).name;
  }

  render() {
    return <Heading>{`${this.username}'s page ${this.id}`}</Heading>;
  }
}
