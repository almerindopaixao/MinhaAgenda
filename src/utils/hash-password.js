import bcrypt from 'bcrypt';

export async function generatePasswordHash(password) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

export async function checkPasswordHash(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}
