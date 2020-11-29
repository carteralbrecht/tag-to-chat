const oktaClient = require('./oktaClient');

const getRoomsAdded = async (userId) => {
    let user;
    try {
        user = await oktaClient.getUser(userId);
    } catch (err) {
        console.log(err);
        return;
    }

    if (user) {
        return user.profile.roomsAdded;
    }
}
  
const getRoomsOwned = async (userId) => {
    let user;
    try {
        user = await oktaClient.getUser(userId);
    } catch (err) {
        console.log(err);
        return;
    }

    if (user) {
        return user.profile.roomsOwned;
    }
}

module.exports = {getRoomsAdded, getRoomsOwned};