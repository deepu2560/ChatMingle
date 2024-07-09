const OnlineStatusModal = require("../Models/Online_Status");

async function setOnlineStatus(userId, socketID) {
  try {
    const setOnlineStatus = await OnlineStatusModal.create({
      userId,
      socketID,
    });

    if (setOnlineStatus) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error at setOnlineStatus func:", error.message);
    return false;
  }
}

async function getOnlineStatus(socketID) {
  try {
    const getOnlineStatus = await OnlineStatusModal.findOne({
      socketID,
    });

    if (getOnlineStatus) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error at getOnlineStatus func:", error.message);
    return false;
  }
}

async function getOnlineStatusByUserID(userId) {
  try {
    const getOnlineStatus = await OnlineStatusModal.findOne({
      userId,
    });

    if (getOnlineStatus) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error at getOnlineStatus func:", error.message);
    return false;
  }
}

async function deleteOnlineStatus(socketID) {
  try {
    const deleteOnlineStatus = await OnlineStatusModal.deleteOne({
      socketID,
    });

    if (deleteOnlineStatus) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error at deleteOnlineStatus func:", error.message);
    return false;
  }
}

module.exports = {
  setOnlineStatus,
  getOnlineStatusByUserID,
  getOnlineStatus,
  deleteOnlineStatus,
};
