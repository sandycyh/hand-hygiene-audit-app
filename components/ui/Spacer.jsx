import { View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';

const Spacer = ({ horizontal, size}) => {
  const defaultValue = 'auto';

  return (
    <View style={{
      width: horizontal ? size : defaultValue,
      height: !horizontal ? size : defaultValue,
    }} 
    />
  )
}

Spacer.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number, 
    PropTypes.string
  ]).isRequired,
  horizontal: PropTypes.bool,
};

Spacer.defaultProps = {
  horizontal: false, 
};

export default Spacer;


// Renders a vertical space of 40 points height
// <Spacer size={40} />

// Renders a horizontal space of 20 points width
// <Spacer size={20} horizontal />

// Renders a vertical space of 100 points height
// <Spacer size={100} />

// Renders a horizontal space of 50% width
// <Spacer size="50%" horizontal />