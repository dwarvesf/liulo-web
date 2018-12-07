import React from 'react';
import cc from 'classcat';
import { ReactComponent as SvgNoQuestion } from '@/components/svg/no-question.svg';

const Empty = ({ className }) => (
  <div className={cc(['text-center', className])}>
    <SvgNoQuestion />
    <div className="text-center mt-8 text-lg opacity-75">
      This topic hasn’t got any questions yet.<br />Add yours and see it here.
    </div>
  </div>
);

export default Empty;
