import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Homepage from './Homepage';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Homepage />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
