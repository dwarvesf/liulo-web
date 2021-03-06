import React from 'react';
import cc from 'classcat';
import orderBy from 'lodash/orderBy';
import { connect } from 'redux-bundler-react';
import { Form, Field } from 'react-final-form';

import QuestionItem from './components/QuestionItem';
import EmptyQuestion from './components/EmptyQuestion';
import FormReset from '@/components/FormReset';

import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';

const sortTypes = [
  { text: 'Time', value: 'inserted_at' },
  { text: 'Vote', value: 'vote_count' },
  { text: 'Answered', value: 'status' },
];

class Event extends React.Component {
  state = { sortBy: sortTypes[0].value };
  componentDidMount() {
    this.props.doMarkEventDetailAsOutdated();
    setInterval(() => {
      this.props.doMarkEventDetailAsOutdated();
    }, 10000);
  }
  submit = values => {
    this.props
      .doCreateQuestion(values.description)
      .then(resp => {
        alert('Ask question successfully');
        return undefined;
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
    const { eventDetail, isLoggedIn, eventDetailIsLoading } = this.props;
    if (!eventDetail && !eventDetailIsLoading)
      return (
        <div className="container px-4 text-4xl font-bold text-center">
          Event Not Found
        </div>
      );
    if (eventDetail) {
      return (
        <div className="container px-4 pt-8">
          <h1 className="md:text-3xl text-2xl font-normal mb-3 flex items-baseline">
            {eventDetail.name}
          </h1>
          {eventDetail.description && (
            <div className="mb-5 text-grey-darker text-base leading-normal">
              {eventDetail.description}
            </div>
          )}
          <Form onSubmit={this.submit}>
            {({ handleSubmit, submitting, form, invalid, pristine }) => (
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
                    disabled={submitting || pristine || invalid}
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
          {this.props.eventDetailQuestions.length > 0 ? (
            <>
              <div className="mt-12">
                <div className="md:w-3/5 w-full flex flex-wrap justify-between mb-6 items-center">
                  <span className="md:text-3xl text-2xl">Sort by</span>
                  {sortTypes.map(({ text, value }) => (
                    <button
                      key={value}
                      type="button"
                      className="md:text-xl text-sm outline-none inline-flex items-center text-black"
                      onClick={() => {
                        this.setState({ sortBy: value });
                      }}
                    >
                      <span
                        className={cc([
                          'radio md:mr-3 mr-2',
                          { active: this.state.sortBy === value },
                        ])}
                      />
                      {text}
                    </button>
                  ))}
                </div>
              </div>
              {orderBy(
                this.props.eventDetailQuestions,
                [this.state.sortBy],
                ['desc'],
              ).map(q => <QuestionItem key={q.id} question={q} />)}
            </>
          ) : (
            <EmptyQuestion />
          )}
        </div>
      );
    }
    return null;
  }
}

export default connect(
  'selectIsLoggedIn',
  'doOpenLoginDialog',
  'selectEventDetail',
  'selectEventDetailIsLoading',
  'doCreateQuestion',
  'selectEventDetailQuestions',
  'doMarkEventDetailAsOutdated',
  Event,
);
