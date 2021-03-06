import React, { Component } from "react";
import PropTypes from "prop-types";
class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      sort: "created:asc",
      repos: [],
      error: null
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`
    )
      .then(data => {
        if (data.status === 404) {
          this.setState({ error: true });
        } else {
          return data.json();
        }
      })
      .then(parsedData => this.setState({ repos: parsedData }));
  }

  render() {
    const { repos, error } = this.state;

    const repoItems = error ? (
      <p className="text-muted mt-4">Unable to find Github Profile</p>
    ) : (
      repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="blank">
                  {repo.name}
                </a>
                <p>{repo.description}</p>
              </h4>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success mr-1">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    );

    return (
      <div>
        <hr />
        <h3>Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
