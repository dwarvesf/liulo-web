import React from 'react';
import cc from 'classcat';
import { connect } from 'redux-bundler-react';
import Component from '@reach/component-component';
import { ReactComponent as SvgUp } from '@/components/svg/vote.svg';

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
          <div className="font-bold mb-4">{question.description}</div>
          <div className="opacity-75">{question.owner.full_name}</div>
        </div>
        <div className="flex-none md:mt-0 mt-5 ml-auto flex items-center hidden text-2xl">
          <SvgUp className="mr-2" />
          {question.vote_count}
          <Component initialState={{ submitting: false }}>
            {({ state, setState }) => (
              <button
                className={cc([
                  'btn text-base h-10 w-32 ml-12',
                  { 'btn-primary': !isVoted },
                ])}
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
                {state.submitting ? 'Sending...' : isVoted ? 'Unvote' : 'Vote'}
              </button>
            )}
          </Component>
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
