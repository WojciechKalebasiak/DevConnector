import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../utlis/is-empty";
import { createProfile, getCurrentUser } from "../../actions/profileActions";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile().then(() => {
      const { profile } = this.props.profile;
      if (profile) {
        const skills = Array.isArray(profile.skills)
          ? profile.skills.join(",")
          : profile.skills;
        profile.skills = skills;
        profile.company = !isEmpty(profile.company) ? profile.company : "";
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.githubusername = !isEmpty(profile.githubusername)
          ? profile.githubusername
          : "";
        if (profile.social) {
          profile.social.twitter = !isEmpty(profile.social.twitter)
            ? profile.social.twitter
            : "";
          profile.social.facebook = !isEmpty(profile.social.facebook)
            ? profile.social.facebook
            : "";
          profile.social.youtube = !isEmpty(profile.social.youtube)
            ? profile.social.youtube
            : "";
          profile.social.instagram = !isEmpty(profile.social.instagram)
            ? profile.social.instagram
            : "";
          profile.social.linkedin = !isEmpty(profile.social.linkedin)
            ? profile.social.linkedin
            : "";
          this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: profile.skills,
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.social.twitter,
            facebook: profile.social.facebook,
            instagram: profile.social.instagram,
            youtube: profile.social.youtube,
            linkedin: profile.social.linkedin
          });
          return;
        }
        this.setState({
          handle: profile.handle,
          company: profile.company,
          website: profile.website,
          location: profile.location,
          status: profile.status,
          skills: profile.skills,
          githubusername: profile.githubusername
        });
        return;
      }
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.create(userData, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.errors !== state.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Twitter"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Linkedin"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }
    const options = [
      { label: "* Select Proffessional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "manager", value: "manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Unique handle for your profile URL. Your full name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your company or company you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values(e.g HTML, CSS, JS, React)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="You can include your username to get latest repos and Github link"
                />
                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Short self-intorduction"
                />
                <div className="mb-4">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(previousState => ({
                        displaySocialInputs: !previousState.displaySocialInputs
                      }));
                    }}>
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  create: (data, history) => dispatch(createProfile(data, history)),
  getCurrentProfile: () => dispatch(getCurrentUser())
});
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile)
);
