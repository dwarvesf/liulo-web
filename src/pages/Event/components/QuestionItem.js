import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'redux-bundler-react';
import Component from '@reach/component-component';
import Vote from '@/components/Vote';
import Reply from '@/components/Reply';

class QuestionItem extends React.Component {
  isVoted = () => {
    const { question, user } = this.props;
    if (!question || !user) return false;
    return !!question.question_votes.find(i => i.voter_id === user.id);
  };
  render() {
    const { question, isLoggedIn, doOpenLoginDialog } = this.props;
    const isVoted = this.isVoted();
    if (!question) return null;
    return (
      <div className="md:p-5 md:pr-8 p-3 border rounded-sm overflow-hidden flex items-center mb-5 md:flex-row flex-col">
        <div className="flex-grow w-full">
          <div className="font-bold md:mb-5">{question.description}</div>
          <div className="hidden md:block opacity-50">
            {question.owner.full_name} -{' '}
            {dayjs(question.inserted_at + 'Z').format('HH:mm')}
          </div>
        </div>
        <div className="flex-none md:mt-0 mt-5 ml-auto flex items-center hidden text-base md:w-24 w-full">
          <div className="flex-grow md:hidden opacity-50">
            {question.owner.full_name} -{' '}
            {dayjs(question.inserted_at + 'Z').format('HH:mm')}
          </div>
          {question.status === 'answered' && (
            <Reply color="var(--primary)" className="mr-6" />
          )}
          <Component initialState={{ submitting: false }}>
            {({ state, setState }) => (
              <button
                className="mr-2 leading-none ml-auto"
                type="button"
                disabled={state.submitting}
                onClick={async () => {
                  if (!isLoggedIn) {
                    return doOpenLoginDialog();
                  }
                  setState({ submitting: true });
                  try {
                    isVoted
                      ? await this.props.doUnvoteQuestion(question.id)
                      : await this.props.doVoteQuestion(question.id);
                  } catch (e) {
                    console.error(e);
                    alert('Something went wrong. Please try again');
                  } finally {
                    setState({ submitting: false });
                  }
                }}
              >
                <Vote color={isVoted ? 'var(--primary)' : 'none'} />
              </button>
            )}
          </Component>
          {question.vote_count}
        </div>
      </div>
    );
  }
}

export default connect(
  'selectIsLoggedIn',
  'selectUser',
  'doVoteQuestion',
  'doUnvoteQuestion',
  'doOpenLoginDialog',
  QuestionItem,
);
