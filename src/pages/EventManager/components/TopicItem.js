import React from 'react';
import cc from 'classcat';
import { connect } from 'redux-bundler-react';
import Component from '@reach/component-component';
import { ReactComponent as SvgCheck } from '@/components/svg/circle-check.svg';

import Link from '@/components/Link';

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('copied');
};
class TopicItem extends React.Component {
  render() {
    const { topic } = this.props;
    const isActive = topic?.status === 'active';
    if (!topic) return null;
    return (
      <div className="md:p-5 md:pr-8 p-3 border rounded-sm overflow-hidden flex items-center mb-5 md:flex-row flex-col relative">
        <div className="flex-grow w-full">
          <div className="font-bold mb-5">{topic.name}</div>
          <div className="mb-5 flex items-center">
            <button
              type="button"
              className="text-primary underline mr-5"
              title="Click to copy url"
              onClick={() => {
                const { origin } = this.props.urlObject;
                copyToClipboard(`${origin}/event/${topic.code}`);
              }}
            >
              {topic.code}
            </button>
            <Link
              to={`/manage-topic/${topic.code}`}
              className="text-primary underline"
              target="_blank"
            >
              Manage Topic ({topic.questions.length}{' '}
              {topic.questions.length > 1 ? 'questions' : 'question'})
            </Link>
          </div>
          <div className="opacity-75">{topic.description}</div>
        </div>
        <div className="flex-none pl-5 md:mt-0 mt-5 ml-auto flex items-center hidden text-base md:w-auto w-full">
          <Component initialState={{ submitting: false }}>
            {({ state, setState }) => (
              <button
                className="leading-none"
                type="button"
                disabled={state.submitting}
                onClick={async () => {
                  setState({ submitting: true });
                  try {
                    isActive
                      ? await this.props.doDeactiveTopic(topic.id)
                      : await this.props.doActiveTopic(topic.id);
                  } catch (e) {
                    console.error(e);
                    alert('Something went wrong. Please try again');
                  } finally {
                    setState({ submitting: false });
                  }
                }}
              >
                <SvgCheck
                  width="20"
                  height="20"
                  className={cc([
                    'fill-current',
                    isActive ? 'text-primary' : 'opacity-25',
                  ])}
                />
              </button>
            )}
          </Component>
        </div>
      </div>
    );
  }
}

export default connect(
  'doRemoveQuestion',
  'doDeactiveTopic',
  'doActiveTopic',
  'selectUrlObject',
  TopicItem,
);
