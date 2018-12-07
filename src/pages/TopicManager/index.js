import React from 'react';
import cc from 'classcat';
import orderBy from 'lodash/orderBy';
import { connect } from 'redux-bundler-react';

import QuestionItem from './components/QuestionItem';

const sortTypes = [
  { text: 'Time', value: 'inserted_at' },
  { text: 'Vote', value: 'vote_count' },
  { text: 'Answered', value: 'status' },
];

class MyTopic extends React.Component {
  state = { sortBy: sortTypes[0].value };
  componentDidMount() {
    setInterval(() => {
      this.props.doMarkMyTopicAsOutdated();
    }, 10000);
  }
  render() {
    const { myTopic } = this.props;
    if (!myTopic)
      return (
        <div className="container px-4 text-4xl font-bold text-center">
          Topic Not Found
        </div>
      );
    return (
      <div className="container px-4 pt-8">
        <h1 className="md:text-3xl text-2xl flex items-center font-normal flex-grow md:mb-0 mb-4">
          {myTopic.name}
        </h1>
        <div className="mt-4">
          <div className="md:w-3/5 w-full flex flex-wrap justify-between mb-6 items-center">
            <span className="md:text-3xl text-2xl">Sort by</span>
            {sortTypes.map(({ text, value }) => (
              <button
                key={value}
                type="button"
                className="md:text-xl text-sm outline-none inline-flex items-center"
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
          this.props.myTopicQuestions,
          [this.state.sortBy],
          ['desc'],
        ).map(q => <QuestionItem key={q.id} question={q} />)}
      </div>
    );
  }
}

export default connect(
  'selectIsLoggedIn',
  'selectMyTopic',
  'doCreateQuestion',
  'selectMyTopicQuestions',
  'doMarkMyTopicAsOutdated',
  MyTopic,
);
