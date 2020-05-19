const dbPool = require("../db");

async function createUser(username, hashPassword) {
    await dbPool.query(`INSERT INTO users(username, password)
                            VALUES("${username}", "${hashPassword}")`);
}
async function getUserByUsername(username) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM users
                                         WHERE username = "${username}"`);
    return [rows];
}
async function getUserById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM users
                                         WHERE id = "${id}"`);
    return [rows];
}

async function updatePassword(id, new_password) {
    await dbPool.query(`UPDATE users
                            SET password = "${new_password}"
                            WHERE id = ${id}`);
}
async function updateContact(userId, email, fullname, phone, avatarUrl) {
    await dbPool.query(`UPDATE contacts
                            SET phone = "${phone}",
                                email = "${email}",
                                fullname = "${fullname}",
                                avatarUrl= "${avatarUrl}"
                            WHERE userId = ${userId}`);
}
async function createContactRow(userId){
    await dbPool.query(`INSERT INTO contacts(userId)
                            VALUES("${userId}")`

    )
}
async function getContactByUserid(userid) {
    const [rows] = await dbPool.query(`SELECT fullname,email,phone,avatarUrl 
                                         FROM contacts
                                         WHERE userId = "${userid}"`);
    return [rows];
}

module.exports={
    createUser,
    getUserByUsername,
    updatePassword,
    getUserById,
    getContactByUserid,
    createContactRow,
    updateContact
};
