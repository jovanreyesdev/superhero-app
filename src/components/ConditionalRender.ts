import React, { ReactNode } from 'react';

interface Props {
  condition: boolean;
  whenTrue: ReactNode;
  whenFalse?: ReactNode;
}

function ConditionalRender({ condition, whenTrue, whenFalse = null }: Props) {
  return condition ? whenTrue : whenFalse;
}

export default ConditionalRender;