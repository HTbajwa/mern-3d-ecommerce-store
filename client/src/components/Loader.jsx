import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ size }) => {
  const color = 'blue';

  return (
    <div
      style={{
        position: 'absolute', // or 'fixed' if needed to cover full screen
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // optional: hides content behind loader
        zIndex: 9999,
      }}
    >
      <ClipLoader
        color={color}
        loading={true}
        size={size || 80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
