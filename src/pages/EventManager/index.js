import React from 'react';
import { connect } from 'redux-bundler-react';
import { Form, Field } from 'react-final-form';

import FormReset from '@/components/FormReset';
import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';
import TopicItem from './components/TopicItem';

class MyEvent extends React.Component {
  submit = values => {
    this.props
      .doCreateTopic(values)
      .then(resp => {
        alert(`Create topic ${resp.name} successfully`);
        return undefined;
      })
      .catch(error => {
        console.dir(error);
        alert('Something went wrong');
      });
  };
  render() {
    const { myEvent, isLoggedIn } = this.props;
    if (!isLoggedIn)
      return (
        <div className="container px-4 text-4xl font-bold text-center">
          Please login to manage your event
        </div>
      );
    if (!myEvent)
      return (
        <div className="container px-4 text-4xl font-bold text-center">
          Event Not Found
        </div>
      );
    return (
      <div className="container px-4 pt-8">
        <h1 className="md:text-3xl text-2xl flex items-center font-normal flex-grow md:mb-10 mb-5">
          {myEvent.name}
        </h1>
        <Form onSubmit={this.submit}>
          {({ handleSubmit, submitting, form, invalid, pristine }) => (
            <form onSubmit={handleSubmit} className="block w-full mt-6">
              <FormReset form={form} />
              <Field name="name">
                {({ input, meta }) => (
                  <FormField className="mb-4 w-full">
                    <div slot="input" className="relative">
                      <Input
                        className="input w-full h-12"
                        errClassName="input-error"
                        required
                        fieldMeta={meta}
                        type="text"
                        placeholder="New topic name..."
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
              <Field name="description">
                {({ input, meta }) => (
                  <FormField className="mb-4 w-full">
                    <div slot="input" className="relative">
                      <Input
                        className="input w-full h-32"
                        errClassName="input-error"
                        required
                        fieldMeta={meta}
                        type="area"
                        placeholder="New topic description..."
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
              <div className="text-right w-full mb-5">
                <button
                  disabled={submitting}
                  className="btn btn-primary h-12 text-lg w-48"
                >
                  {submitting ? 'Creating...' : 'Create new topic'}
                </button>
              </div>
            </form>
          )}
        </Form>
        {this.props.myEventTopics.map(t => <TopicItem key={t.id} topic={t} />)}
      </div>
    );
  }
}

export default connect(
  'selectIsLoggedIn',
  'selectMyEvent',
  'doCreateTopic',
  'selectMyEventTopics',
  MyEvent,
);
