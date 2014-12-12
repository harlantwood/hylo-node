/**
 * playSessionCheck
 *
 * @module      :: Policy
 * @description :: Allow any user logged in from Play
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var playSession = new PlaySession(req);
  if (playSession.isValid()) {
    playSession.fetchUser().then(function(user) {
      if (user) {
        sails.log.debug("Play session is valid: " + user.get('email'));
        req.session.authenticated = true;
        req.session.user = user;

        req.rollbar_person = user.pick('id', 'name', 'email');
      }
      next();
    });

  } else {
    sails.log.debug("Play session is invalid or absent");
    next();
  }
};
