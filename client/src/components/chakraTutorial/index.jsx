import React, { useState } from 'react';
import { Formik } from 'formik';
import { Input, Button } from '@chakra-ui/core';

const ChalkraTutorial = () => {
  const [prefix, setPrefix] = useState('?');
  return (
    <div>
      <h1> Chalkra-UI Tutorial</h1>
      {/*  Sets the initial text to the text.
      When this gets submitted is will set the text to the values */}
      <Formik
        initialValues={{ prefix }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {
          (props) => (

            <form onSubmit={props.handleSubmit}>
              <Input type="text" name='prefix' onChange={props.handleChange} defaultValue={prefix} />
              <Button type="submit" variantColor="orange" children='Update Prefix'/>
            </form>
          )
        }
      </Formik>
    </div>
  );
};
export default ChalkraTutorial;
