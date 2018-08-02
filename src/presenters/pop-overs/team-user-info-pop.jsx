/* global notify */

import React from 'react';
import PropTypes from 'prop-types';

import Thanks from '../includes/thanks.jsx';
import Loader from '../includes/loader.jsx';

const MEMBER_ACCESS_LEVEL = 20;
const ADMIN_ACCESS_LEVEL = 30;

// Remove from Team 👋

const RemoveFromTeam = ({removeFromTeam}) => (
  <section className="pop-over-actions danger-zone">
    <button className="button-small has-emoji button-tertiary button-on-secondary-background" onClick={removeFromTeam}>
      Remove from Team
      <span className="emoji wave" />
    </button>
  </section>
);

RemoveFromTeam.propTypes = {
  removeFromTeam: PropTypes.func.isRequired,
};


// User Actions Section

const UserActions = ({user}) => (
  <section className="pop-over-actions user-actions">
    <a href={user.userLink}>
      <button className="button-small has-emoji button-tertiary">
        <span>Profile </span>
        <img className="emoji avatar" src={user.userAvatarUrl} alt={user.login}></img>
      </button>
    </a>
  </section>
);

UserActions.propTypes = {
  user: PropTypes.shape({
    userLink: PropTypes.string.isRequired,
    userAvatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};


// Admin Actions Section ⏫⏬

const AdminActions = ({user, userIsTeamAdmin, updateUserPermissions}) => {
  
  let removeAdminStatus = () => {
    updateUserPermissions(user.id, MEMBER_ACCESS_LEVEL);
  };
  
  let addAdminStatus = () => {
    updateUserPermissions(user.id, ADMIN_ACCESS_LEVEL);
  };

  return (
    <section className="pop-over-actions admin-actions">
      { userIsTeamAdmin && 
        <button className="button-small button-tertiary has-emoji" onClick={() => {removeAdminStatus();}}>
          <span>Remove Admin Status </span>
          <span className="emoji fast-down" />
        </button>
      ||
        <button className="button-small button-tertiary has-emoji" onClick={() => {addAdminStatus();}}>
          <span>Make an Admin </span>
          <span className="emoji fast-up" />
        </button>
      }
    </section>
  );
};

AdminActions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  updateUserPermissions: PropTypes.func.isRequired,
};


// Thanks 💖

const ThanksCount = ({count}) => (
  <section className="pop-over-info">
    <Thanks count={count} />
  </section>
);


// Team User Info

export default class TeamUserInfoPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.removeFromTeam = this.removeFromTeam.bind(this);
  }
  
  removeFromTeam() {
    this.props.togglePopover();
    this.props.removeUser(this.props.user.id);
  }

  render() {
    return (
      <dialog className="pop-over team-user-info-pop">
        <section className="pop-over-info">
          <a href={this.props.user.userLink}>
            <img className="avatar" src={this.props.user.userAvatarUrl} alt={this.props.user.login} style={this.props.user.style}/>
          </a>
          <div className="info-container">
            <p className="name" title={this.props.user.name}>{this.props.user.name}</p>
            <p className="user-login" title={this.props.user.login}>@{this.props.user.login}</p>
            { this.props.userIsTeamAdmin && 
              <div className="status-badge">
                <span className="status admin" data-tooltip="Can edit team info and billing">
                  Team Admin
                </span>
              </div>
            }
          </div>
        </section>
        { this.props.user.thanksCount > 0 && <ThanksCount count={this.props.user.thanksCount} /> }
        <UserActions user={this.props.user} />
        { this.props.currentUserIsTeamAdmin &&
          <AdminActions 
            user={this.props.user}
            userIsTeamAdmin={this.props.userIsTeamAdmin}
            updateUserPermissions={this.props.updateUserPermissions}
          />
        }
        { this.props.currentUserIsTeamAdmin && <RemoveFromTeam removeFromTeam={this.removeFromTeam} /> }
      </dialog>
    );
  }
}

TeamUserInfoPop.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    userAvatarUrl: PropTypes.string.isRequired,
    userLink: PropTypes.string.isRequired,
    thanksCount: PropTypes.number.isRequired,
    isOnTeam: PropTypes.bool,
  }).isRequired,
  currentUserIsOnTeam: PropTypes.bool.isRequired,
  removeUser: PropTypes.func.isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  api: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  currentUserIsTeamAdmin: PropTypes.bool.isRequired,
  updateUserPermissions: PropTypes.func.isRequired,
};

TeamUserInfoPop.defaultProps = {
  user: {
    isOnTeam: false
  },
  currentUserIsOnTeam: false,
};

