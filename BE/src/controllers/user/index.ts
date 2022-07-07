import { Response, Request } from "express";
import User from "../../models/user";
import { IUser } from "../../types/user";

export const login = async (
  req: Request,
  res: Response
): Promise<IUser | null> => {
  try {
    const { username, password } = req.params;
    const exitedUser = await User.findOne({
      Username: username,
      Password: password,
    });
    res.status(200).json(exitedUser);
    return exitedUser;
  } catch (error) {
    throw error;
  }
};
