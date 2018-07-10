import React from 'react';
import PropTypes from 'prop-types';

import Thanks from '../includes/thanks.jsx';
import Loader from '../includes/loader.jsx';

const MEMBER_ACCESS_LEVEL = 20
const ADMIN_ACCESS_LEVEL = 30

// Remove from Team 👋

const RemoveFromTeam = ({action}) => (
  <section className="pop-over-actions danger-zone">
    <button className="button-small has-emoji button-tertiary button-on-secondary-background" onClick={action}>
      Remove from Team
      <span className="emoji wave" />
    </button>
  </section>
);

RemoveFromTeam.propTypes = {
  action: PropTypes.func.isRequired,
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


// Admin Actions Section

// TODO
  // update UI, user props
  // I can unadmin myself: (test this case, UI should adapt)
  // case: try and remove the last/only admin on a team
const AdminActions = ({user, userIsTeamAdmin, api, teamId, updateUserIsTeamAdmin, loadingAdminStatus}) => {
  
  const updateAdminStatus = (accessLevel, updateLoadingAdminStatus) => {
    updateLoadingAdminStatus(true)
    api.patch((`teams/${teamId}/users/${user.id}`), {
      access_level: accessLevel
    }
    .then(({data}) => {
      updateUserIsTeamAdmin(accessLevel);
      updateLoadingAdminStatus(false);
    }).catch(error => {
      console.error("updateAdminStatus", accessLevel, error, error.response)
      // last admin
    })
  )
  
  return (
    <section className="pop-over-actions admin-actions">
      { userIsTeamAdmin && 
        <button className="button-small button-tertiary" onClick={() => updateAdminStatus(MEMBER_ACCESS_LEVEL, updateLoadingAdminStatus)}>
          <span>Remove Admin Status</span>
          { loadingAdminStatus && <Loader />}
        </button>
      ||
        <button className="button-small button-tertiary" onClick={() => updateAdminStatus(ADMIN_ACCESS_LEVEL, updateLoadingAdminStatus)}>
          <span>Make an Admin</span>
          { loadingAdminStatus && <Loader />}
        </button>
      }
    </section>
  )
};

AdminActions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  api: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  updateUserIsTeamAdmin: PropTypes.func.isRequired,
  updateLoadingAdminStatus: PropTypes.func.isRequired,
  loadingAdminStatus: PropTypes.bool.isRequired,
};


// Thanks 💖

const ThanksCount = ({count}) => (
  <section className="pop-over-info">
    <Thanks count={count} />
  </section>
);


// Team User Info

class TeamUserInfoPop extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      userIsTeamAdmin: this.props.userIsTeamAdmin,
      loadingAdminStatus: false
    };
  }

  removeFromTeamAction() {
    this.props.togglePopover();
    this.props.removeUserFromTeam();
  };
  
  updateUserIsTeamAdmin(accessLevel) {
    let isAdmin = false
    if (accessLevel === ADMIN_ACCESS_LEVEL) {
      isAdmin = true
    }
    this.setState({
      userIsTeamAdmin: isAdmin
    })
  }
  
  updateLoadingAdminStatus(value) {
    this.setState({
      loadingAdminStatus: value
    })
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
            { this.state.userIsTeamAdmin && 
              <div className="status-badge">
                <span className="status admin">Team Admin</span>
              </div> 
            }
          </div>
        </section>
        { this.props.user.thanksCount > 0 && <ThanksCount count={this.props.user.thanksCount} /> }
        <UserActions user={this.props.user} />
        <AdminActions 
          user={this.props.user} 
          userIsTeamAdmin={this.state.userIsTeamAdmin} 
          api={this.props.api} 
          teamId={this.props.teamId} 
          updateUserIsTeamAdmin={(accessLevel) => this.updateUserIsTeamAdmin(accessLevel)} 
          updateLoadingAdminStatus={(value) => this.updateLoadingAdminStatus(value)}
          loadingAdminStatus={this.state.loadingAdminStatus} 
        />
        { this.props.currentUserIsOnTeam && <RemoveFromTeam action={this.removeFromTeamAction} /> }
      </dialog>
    );
  }
};

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
  removeUserFromTeam: PropTypes.func.isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  api: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
};

TeamUserInfoPop.defaultProps = {
  user: {
    isOnTeam: false
  },
  currentUserIsOnTeam: false,
};

export default TeamUserInfoPop;
