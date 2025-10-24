import jwt from 'jsonwebtoken';

const generateToken = async (id) => {
  try {
        const token = await jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return token;
    } catch (error) {
        throw new Error("Error generating token");
    }
};

export default generateToken;