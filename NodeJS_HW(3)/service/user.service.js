const fsExtra = require('fs-extra');
const path = require('path');

const dirPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
 findAll: () => {
	return fsExtra.readJSON(dirPath);
 },
 register: async (user) => {
	const readUsers = await fsExtra.readJSON(dirPath);

	readUsers.push(user);
	return fsExtra.writeJSON(dirPath, readUsers);
 },
 findUserById: async (userId) => {
	const oneUser = await fsExtra.readJSON(dirPath);

	return oneUser[userId];
 },
 findUserByEmail: async (email) => {
	const findUser = await fsExtra.readJSON(dirPath);
	const foundUser = findUser.findIndex(u => u.email === email);

	return findUser[foundUser];
 },
 deleteUserById: async (userId) => {
	const readUsers = await fsExtra.readJSON(dirPath);
	const deletedUser = readUsers.filter((value, index) => index !== +userId);

	await fsExtra.writeJSON(dirPath, deletedUser);
 }
}
