import React from 'react';
import { connect } from 'redux-bundler-react';
import { Form, Field } from 'react-final-form';

import { ReactComponent as SvgPlus } from '@/components/svg/plus.svg';
import QuestionItem from './components/QuestionItem';
import Dialog from '@/components/Dialog';

import { Input, InputMsg } from '@/components/Input';
import FormField from '@/components/FormField';
import { ReactComponent as SvgClose } from '@/components/svg/close.svg';

class Event extends React.Component {
  state = { showQuestionDialog: false };
  submit = values => {
    this.props
      .doCreateQuestion(values.description)
      .then(_resp => {
        this.closeQuestionDialog();
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
  openQuestionDialog = () => {
    this.setState({ showQuestionDialog: true });
  };
  closeQuestionDialog = () => {
    this.setState({ showQuestionDialog: false });
  };
  render() {
    const { eventDetail } = this.props;
    if (!eventDetail)
      return <div className="container px-4">Event Not Found</div>;
    return (
      <div className="container px-4 pt-8">
        <div className="flex items-center mb-5 justify-between flex-wrap">
          <h1 className="md:text-3xl text-2xl flex items-center font-bold flex-grow md:mb-0 mb-4">
            {eventDetail.name}
          </h1>
          <button
            className="btn py-4 px-5"
            type="button"
            onClick={this.askQuestion}
          >
            <SvgPlus className="mr-3" />Ask Question
          </button>
        </div>
        {this.props.eventDetailQuestions.map(q => (
          <QuestionItem key={q.id} question={q} />
        ))}
        <Dialog
          isOpen={this.state.showQuestionDialog}
          style={{ content: { maxWidth: '100%', width: '600px' } }}
        >
          <div className="dialog bg-white rounded overflow-hidden dialog text-center leading-none h-full relative">
            <button
              className="button"
              type="button"
              onClick={() => {
                this.props.onClose();
              }}
            >
              <SvgClose className="absolute pin-r pin-t mt-4 mr-4" />
            </button>
            <h3 className="text-3xl mb-10 font-medium">Please ask question</h3>
            <Form onSubmit={this.submit}>
              {({ handleSubmit, submitting, dirtySinceLastSubmit, form }) => (
                <form
                  onSubmit={handleSubmit}
                  id="join-form"
                  className="mx-auto flex items-center flex-col w-full"
                >
                  <Field name="description">
                    {({ input, meta }) => (
                      <FormField className="mb-10 w-full">
                        <div slot="input" className="relative">
                          <Input
                            className="input w-full h-32"
                            errClassName="input-error"
                            required
                            fieldMeta={meta}
                            type="area"
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
                  <div className="text-right w-full">
                    <button
                      disabled={submitting}
                      className="btn h-10 text-base w-32 mr-5"
                      type="reset"
                      onClick={this.closeQuestionDialog}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={submitting}
                      className="btn btn-primary h-10 text-base w-32"
                    >
                      {submitting ? 'Submitting...' : 'Ask Question'}
                    </button>
                  </div>
                </form>
              )}
            </Form>
          </div>
        </Dialog>
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
  Event,
);
