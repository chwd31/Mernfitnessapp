import React from 'react';

const ProfilePage = () => {
  const profile = {
    name: 'John Doe',
    age: 30,
    height: 72,
    weight: 180,
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <p>Height: {profile.height}</p>
      <p>Weight: {profile.weight}</p>
      <button>Edit Profile</button>
    </div>
  );
};

export default ProfilePage;
