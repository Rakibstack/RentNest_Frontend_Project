
import jwt from "jsonwebtoken";

const verifyToken = (access: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(access, secret);

    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : "Invalid token",
    };
  }
};

export const jwtUtils = {
  verifyToken,
};