import React, { Component } from 'react';
import { Heading, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

export default class SampleDashboard extends Component {
  static myUsers = [
    {
      name: 'Sally',
      userId: 7,
    },
    {
      name: 'John',
      userId: 12,
    },
    {
      name: 'Joe',
      userId: 3,
    },
  ]

  render() {
    return (
      <div>
        <Heading>Sample Dashboard</Heading>
        <>
          {SampleDashboard.myUsers.map((user, index) => (
            <div key={user.userId}>
              <Link to={`/dashboard/${user.userId}`}>
                <Button variantColor='red'>{user.name}</Button>
              </Link>
            </div>
          ))}
        </>
      </div>
    );
  }
}
