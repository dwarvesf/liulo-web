import React from 'react';
import { connect } from 'redux-bundler-react';
import { Form, Field } from 'react-final-form';

import QuestionItem from './components/QuestionItem';
import FormReset from '@/components/FormReset';

import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';

class Event extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.doMarkEventDetailAsOutdated();
    }, 10000);
  }
  submit = values => {
    this.props
      .doCreateQuestion(values.description)
      .then(resp => {
        return resp;
      })
      .catch(_err => {
        alert('Something went wrong. Please try again');
      });
  };
  askQuestion = () => {
    if (!this.props.isLoggedIn) {
      return this.props.doOpenLoginDialog();
    }
    this.openQuestionDialog();
  };
  render() {
    const { eventDetail, isLoggedIn } = this.props;
    if (!eventDetail)
      return (
        <div className="container px-4 text-4xl font-bold text-center">
          Event Not Found
        </div>
      );
    return (
      <div className="container px-4 pt-8">
        <h1 className="md:text-3xl text-2xl flex items-center font-bold flex-grow md:mb-0 mb-4">
          {eventDetail.name}
        </h1>
        <Form onSubmit={this.submit}>
          {({ handleSubmit, submitting, form }) => (
            <form onSubmit={handleSubmit} className="block w-full mt-6">
              <FormReset form={form} />
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
                        placeholder="Type your question here..."
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
                  type="button"
                  onClick={() => {
                    if (isLoggedIn) {
                      form.submit();
                    } else {
                      this.props.doOpenLoginDialog();
                    }
                  }}
                >
                  {submitting ? 'Submitting...' : 'Ask Question'}
                </button>
              </div>
            </form>
          )}
        </Form>
        {this.props.eventDetailQuestions.map(q => (
          <QuestionItem key={q.id} question={q} />
        ))}
      </div>
    );
  }
}

export default connect(
  'selectIsLoggedIn',
  'doOpenLoginDialog',
  'selectEventDetail',
  'doCreateQuestion',
  'selectEventDetailQuestions',
  'doMarkEventDetailAsOutdated',
  Event,
);
