import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'redux-bundler-react';

import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';

import './Home.scss';

class Home extends Component {
  submit = values => {
    this.props.doUpdateUrl(`/event/${values.code}`);
  };
  render() {
    return (
      <div
        id="home"
        className="container px-4 pb-10 flex flex-col flex-grow justify-center"
      >
        <h1 className="font-bold block mb-4 text-center md:text-4xl text-xl">
          Enter an event code to join
        </h1>
        <Form onSubmit={this.submit}>
          {({ handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              id="join-form"
              className="mx-auto flex items-center flex-col"
            >
              <Field name="code">
                {({ input, meta }) => (
                  <FormField className="mb-10">
                    <div slot="input" className="relative">
                      <Input
                        className="input text-lg"
                        errClassName="input-error"
                        placeholder="XXXX"
                        maxLength={4}
                        minLength={4}
                        required
                        fieldMeta={meta}
                        {...input}
                      />
                    </div>
                    <InputMsg
                      slot="msg"
                      className="input-msg font-semibold text-base"
                      errClassName="text-primary"
                      fieldMeta={meta}
                    />
                  </FormField>
                )}
              </Field>
              <button
                disabled={submitting}
                className="btn btn-primary h-10 text-base"
              >
                {submitting ? 'Joining...' : 'Join'}
              </button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default connect(
  'doUpdateUrl',
  Home,
);
