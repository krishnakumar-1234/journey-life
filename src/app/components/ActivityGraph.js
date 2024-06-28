import React from 'react';
import ActivityGraph2D from '../components/ActivityGraph';

const UserProfile = ({ dateTracker }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <h2 className="text-xl mb-2">Activity Graph</h2>
      <ActivityGraph2D dateTracker={dateTracker} />
    </div>
  );
};

export default UserProfile;
