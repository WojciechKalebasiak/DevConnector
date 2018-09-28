import React, { Component } from "react";
import Moment from "react-moment";
class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;
    const experienceItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.comapny}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.form}</Moment> -
          {exp.current ? " Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));
    const educationItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.form}</Moment> -
          {edu.current ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experienceItems.length > 0 ? (
            <ul className="list-group">{experienceItems}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educationItems.length > 0 ? (
            <ul className="list-group">{educationItems}</ul>
          ) : (
            <p className="text-center">No education listed</p>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileCreds;
