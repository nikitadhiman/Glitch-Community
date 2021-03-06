import React from 'react';
import PropTypes from 'prop-types';

// react tells me that nested <a> tags are bad and I shouldn't do that
// so we will replace the outer tags with a special on click <div> tag
// which will act like a link (or as close as I can get via nice code)

const handler = (evt) => {
  // Real links and interactive elements take priority
  if (evt.target.closest('a[href], button, input')) return;
  // Make sure there wasn't a clicky div inside this clicky div
  if (evt.target.closest('[data-href]') !== evt.currentTarget) return;
  
  // Ok, this click is real. Do the thing
  window.location.assign(evt.currentTarget.dataset.href);
};

const WrappingLink = ({href, children, className, style}) => (
  <div data-href={href} onClick={handler} className={className} style={style} role="presentation">
    {children}
  </div>
);

WrappingLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default WrappingLink;