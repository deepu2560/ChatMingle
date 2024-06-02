const UserModel = require("../Models/User_Models");

async function getting_all_user_details(allChatsIds) {
  try {
    const allUserDetails = await UserModel.find(
      { _id: { $in: allChatsIds } },
      { username: 1, full_name: 1, _id: 0 },
    );

    return allUserDetails;
  } catch (error) {
    console.log("Error at getting_all_user_details func:", error.message);
  }
}

module.exports = { getting_all_user_details };
