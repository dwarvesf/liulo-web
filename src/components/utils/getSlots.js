import { Children } from 'react';

export default function getSlots(children, slotNames = []) {
  if (!slotNames || !slotNames.length) {
    return [];
  }

  let matched = [];
  let unmatched = [];

  Children.toArray(children).forEach(child => {
    if (!child) {
      return;
    }
    let slotIndex = slotNames.indexOf(child.props.slot);
    if (slotIndex === -1) {
      unmatched.push(child);
      return;
    }
    matched[slotIndex] = child;
  });

  return matched.concat(unmatched);
}
