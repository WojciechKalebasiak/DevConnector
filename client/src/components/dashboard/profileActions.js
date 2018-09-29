import React from "react";
import { Link } from "react-router-dom";
const ProfileActions = () => {
  return (
    <div className="mb-4 d-flex flex-column flex-md-row" role="group">
      <Link to="/edit-profile" className="btn btn-light mt-2">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light mt-2">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light mt-2">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};
export default ProfileActions;
