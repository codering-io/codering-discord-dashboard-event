import React, { useState } from 'react';
import { Formik } from 'formik';
import { Input, Button } from '@chakra-ui/core';

const ChakraTutorial = () => {
  const [text, setText] = useState('Text');
  return (
    <div>
      <h1> Chakra-UI Tutorial</h1>
      {/*
      Sets the initial text to the text.
      When this gets submitted is will set the text to the values
      */}
      <Formik
        initialValues={{ text }}
        onSubmit={(value) => {
          /* This is what value looks like.
           {text: "new text"}
          The value of text will be the text submitted from the input.
          */
          setText(value.text);
        }}
      >
        {
          /**
           * @param props - The props passed in from Formik.
           */
          (props) => (
            /*
             When the form is submitted it will call the handleSubmit props from Formik.
             This will also call the callback function in the onSubmit on Formik
             When the input from Chakra changes it will call the handleChange prop from Formik.
             The default text sets the input to show the text.
             When the button from Chakra is clicked it will submit the form.
             This happens because the type of the button is set to submit.
             This also calls the handleSubmit prop from Formik.
            */
            <form onSubmit={props.handleSubmit}>
              <Input type="text" name='text' onChange={props.handleChange} defaultValue={text} />
              <Button type="submit" variantColor="orange">
                Update Text
              </Button>
            </form>
          )
        }
      </Formik>
      {/* This displays the text that is submitted from the form. */}
      <h1>
        Current Text: {text}
      </h1>
    </div>
  );
};
export default ChakraTutorial;
