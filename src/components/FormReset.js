import React from 'react';
import { FormSpy } from 'react-final-form';

const FormReset = ({ form }) => {
  return (
    <FormSpy
      subscription={{ submitSucceeded: true }}
      onChange={state => {
        if (state.submitSucceeded) {
          form && form.reset && form.reset();
        }
      }}
    />
  );
};

export default FormReset;
