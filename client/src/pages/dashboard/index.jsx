import React, { Component, Fragment } from 'react';
import { Heading, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import usersTable from '../../constants/usersTable';

export default class SampleDashboard extends Component {
  render() {
    return (
      <div>
        <Heading>Sample Dashboard</Heading>

        {/* usersTable.map() lets us iterate over the array
        and access the object to render based on the properties
        of the object (name and id) */}
        {usersTable.map((user) => (
          <Fragment key={user.userId}>
            <Link to={`/dashboard/${user.userId}`}>
              <Button variantColor='red'>{user.name}</Button>
            </Link>
          </Fragment>
        ))}
      </div>
    );
  }
}
