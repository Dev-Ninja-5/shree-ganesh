import { User } from "../../models";
import { UserIF } from "../../types/UserIF";
import { lock } from "../../utils/locker";

export const login = async ({email,password}:{email:string;password:string}) => {

  const user: any = await User.findOne({ $and: [{ email }, { password }] });

  if (!user) throw { status: 401, message: "Login credentials are invalid" };

  const { role, _id, first_name, last_name } = user;

  const access_token = lock(
    { role, _id, email, name: first_name + " " + last_name },
    60 * 200
  );
  return { access_token, role };
};

export const register = async (args: UserIF) => {
  let user;
  user = await User.findOne({ email: args.email });
  if (user) throw { status: 409, message: "Email already exist in the system" };
  // create new user
  user = await User.create(args);
  
  return {
    user,
    statusCode: 201,
    message: "User is registered successfully",
  };
};

export const create = async (args: UserIF) => {
  let user;
  user = await User.findOne({ email: args.email });
  if (user)
    return { status: 409, message: "Email already exist in the system" };
  user = await User.create(args);
  return {
    user,
    statusCode: 201,
    message: "User is registered successfully",
  };
};
