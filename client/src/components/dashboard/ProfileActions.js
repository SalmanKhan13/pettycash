import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-onlineservices" className="btn btn-light">
        <i className="fas fa-globe text-info mr-1" />
        Add OnlineServices
      </Link>
      <Link to="/add-logistics" className="btn btn-light">
        <i className="fas fa-archive text-info mr-1" />
        Add Logistics
      </Link>
       <Link to="/add-travelling" className="btn btn-light">
        <i className="fas fa-bus text-info mr-1" />
        Add Travelling
      </Link>
    </div>
  );
};

export default ProfileActions;
