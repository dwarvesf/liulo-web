import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'redux-bundler-react';
import Component from '@reach/component-component';
import Vote from '@/components/Vote';
import { ReactComponent as SvgClose } from '@/components/svg/close.svg';

class QuestionItem extends React.Component {
  render() {
    const { question } = this.props;
    const isAnswered = question?.status === 'answered';
    if (!question) return null;
    return (
      <div className="md:p-5 md:pr-8 p-3 border rounded-sm overflow-hidden flex items-center mb-5 md:flex-row flex-col relative">
        <button
          type="button"
          onClick={async () => {
            try {
              const confirm = window.confirm(
                'Do you want to remove this question?',
              );
              if (confirm) {
                await this.props.doRemoveQuestion(question.id);
              }
            } catch (error) {
              console.dir(error);
              alert('Something went wrong');
            }
          }}
        >
          <SvgClose className="absolute pin-t pin-r mt-3 mr-3" />
        </button>
        <div className="flex-grow w-full">
          <div className="font-bold md:mb-5">{question.description}</div>
          <div className="hidden md:block opacity-50">
            {question.owner.full_name} -{' '}
            {dayjs(question.inserted_at + 'Z').format('HH:mm')}
          </div>
        </div>
        <div className="flex-none md:mt-0 mt-5 ml-auto flex items-center hidden text-base md:w-auto w-full">
          <div className="flex-grow md:hidden opacity-50">
            {question.owner.full_name} -{' '}
            {dayjs(question.inserted_at + 'Z').format('HH:mm')}
          </div>
          <Component initialState={{ submitting: false }}>
            {({ state, setState }) => (
              <button
                className="mr-6 leading-none"
                type="button"
                disabled={state.submitting}
                onClick={async () => {
                  setState({ submitting: true });
                  try {
                    isAnswered
                      ? await this.props.doUnmarkAnsweredQuestion(question.id)
                      : await this.props.doMarkAnsweredQuestion(question.id);
                  } catch (e) {
                    console.error(e);
                    alert('Something went wrong. Please try again');
                  } finally {
                    setState({ submitting: false });
                  }
                }}
              >
                <Vote color={isAnswered ? 'var(--primary)' : 'none'} />
              </button>
            )}
          </Component>
          <Vote className="mr-2" color="var(--primary)" />
          {question.vote_count}
        </div>
      </div>
    );
  }
}

export default connect(
  'doRemoveQuestion',
  'doMarkAnsweredQuestion',
  'doUnmarkAnsweredQuestion',
  QuestionItem,
);
