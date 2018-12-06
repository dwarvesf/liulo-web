import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'redux-bundler-react';

import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';

import { ReactComponent as SvgGoogle } from '@/components/svg/google-brands.svg';
import './Home.scss';

class Home extends Component {
  submit = values => {};
  render() {
    return (
      <div id="home" className="container px-4 mb-10">
        <h1 className="font-bold block mb-4 text-center lg:text-4xl text-xl">
          Enter an event code to join
        </h1>
        <Form onSubmit={this.submit}>
          {({ handleSubmit, submitting, dirtySinceLastSubmit }) => (
            <form
              onSubmit={handleSubmit}
              id="join-form"
              className="mx-auto flex items-center flex-col mb-10"
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
        <div className="text-center mb-4">or sign in with</div>
        <div className="text-center">
          <button
            className="btn h-10 w-10"
            type="button"
            onClick={() => {
              this.props.doOpenLoginDialog();
            }}
          >
            <SvgGoogle width="10" />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  'doOpenLoginDialog',
  Home,
);
