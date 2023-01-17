import User from '../models/userModel';


interface User {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
}


export const newUserValidation = async (body: User) => {
  let error;

  if (body.username === undefined ||
    body.password === undefined ||
    body.name === undefined ||
    body.email === undefined) {
    switch (undefined) {
      case body.username:
        error = 'username must be provided'
        return error
      case body.password:
        error = 'password must be provided'
        return error
      case body.name:
        error = 'name must be provided'
        return error
      case body.email:
        error = 'email must be provided'
        return error
      default:
        error = 'username, password, name and email must be provided'
        return error
    }

  }

  if (body.username.length < 3 ||
    body.password.length < 3 ||
    body.name.length < 3 ||
    body.email.length < 3) {
    switch (true) {
      case body.username.length < 3:
        error = 'username must be at least 3 characters long'
        return error
      case body.password.length < 3:
        error = 'password must be at least 3 characters long'
        return error
      case body.name.length < 3:
        error = 'name must be at least 3 characters long'
        return error
      case body.email.length < 3:
        error = 'email must be at least 3 characters long'
        return error
      default:
        error = 'username, password, name and email must be at least 3 characters long'
        return error
    }

  }

  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    error = 'username must be unique'
    return error
  }
  return error
}


export default newUserValidation;