const auth = require('./authRoutes.js')
const leaderboards = require('./scoreRoutes.js')

module.exports.getUser = auth.getUser;
module.exports.getLeaderboards = leaderboards.getLeaderboards;
module.exports.submitScore = leaderboards.submitScore;