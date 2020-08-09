import React, { Component } from 'react';
import { Heading } from '@chakra-ui/core';
import usersTable from '../../constants/usersTable';

export default class SamplePage extends Component {
  /*
  A match object contains information about how a <Route path> matched the URL.
  match objects contain the following properties:
  params - (object) fields parsed from the URL corresponding to the dynamic parts of the path
    - dynamic parts are denoted with : in the router path url
  Other parts of the match prop can be found here:
  https://reactrouter.com/web/api/match
  */
  constructor(props) {
    super(props);
    /*
      Our props.match object looks like:
      {
        "path":"/dashboard/:id",
        "url":"/dashboard/12",
        "isExact":true,
        "params":{
          "id":"12"
        }
      }
    */
    this.id = +props.match.params.id;
    this.username = (usersTable.find((user) => (user.userId === this.id))).name;
  }

  render() {
    return <Heading>{`${this.username}'s page ${this.id}`}</Heading>;
  }
}
