const oktaClient = require('./oktaClient');

const removeRoomOwned = async (userId, roomId) => {
    let user;
    try {
        user = await oktaClient.getUser(userId);
    } catch (err) {
        console.log(err);
        return;
    }

    if (!user) return;

    user.profile.roomsOwned = user.profile.roomsOwned.filter(e => e !== roomId);
    await user.update();

    return user.profile.roomsOwned;
}

const removeRoomAdded = async (userId, roomId) => {
    let user;
    try {
        user = await oktaClient.getUser(userId);
    } catch (err) {
        console.log(err);
        return;
    }

    if (!user) return;

    user.profile.roomsAdded = user.profile.roomsAdded.filter(e => e !== roomId);
    await user.update();

    return user.profile.roomsAdded;
}

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

module.exports = {getRoomsAdded, getRoomsOwned, removeRoomAdded, removeRoomOwned};