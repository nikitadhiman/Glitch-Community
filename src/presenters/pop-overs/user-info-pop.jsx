import React from 'react';
import PropTypes from 'prop-types';

const UserInfoPop = (user) => (
  <p>f</p>
)


UserInfoPop.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired, 
  domain: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isOnTeam: PropTypes.bool,
  currentUserIsOnTeam
};



export default UserInfoPop

// make not disposable

// dialog.pop-over.user-info-pop.disposable(click=@stopPropagation)

//   section.pop-over-info.user-result
//     ul.results
//       a(href=@userLink)
//         = UserResultPresenter(@application, @user, {showThanks: true})

//   section.pop-over-info.last-section.section-has-tertiary-buttons.danger-zone
//     button.button-small.has-emoji.button-tertiary.button-on-secondary-background(click=@removeUser class=@hiddenIfUserIsCurrentUser)
//       span Remove from Team
//       span.emoji.wave
//     button.button-small.has-emoji.button-tertiary.button-on-secondary-background(click=@removeUser class=@hiddenUnlessUserIsCurrentUser)
//       span Leave this Team
//       span.emoji.wave



// module.exports = function(application, user) {

//   return {
  
//     application,
//     user,

//     stopPropagation(event) {
//       return event.stopPropagation();
//     },

//     userCover() {
//       return user.coverUrl('small');
//     },
      
//     userAvatarBackground() {
//       return {backgroundColor: user.color()};
//     },
  
//     userLink() {
//       return user.userLink();
//     },

//     removeUser() {
//       return application.team().removeUser(application, user);
//     },
    
//     name() {
//       return user.name();
//     },
    
//     avatarUrl() {
//       return user.userAvatarUrl('small');
//     },
    
//     hiddenIfUserIsCurrentUser() {
//       if (user.isCurrentUser(application)) { return 'hidden'; }
//     },
    
//     hiddenUnlessUserIsCurrentUser() {
//       if (!user.isCurrentUser(application)) { return 'hidden'; }
//     },
//   };
// };


// - UserResultPresenter = require "../../presenters/user-result"
