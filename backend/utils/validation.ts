

interface User {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
}


export const newUserValidation = (body: User) => {
  let error;

  if (body.username === undefined ||
    body.password === undefined ||
    body.name === undefined ||
    body.email === undefined ||
    body.username.length < 3 ||
    body.password.length < 3 ||
    body.name.length < 3 ||
    body.email.length < 3) {
    switch (undefined) {
      case body.username:
        error = 'username must be provided'
        break
      case body.password:
        error = 'password must be provided'
        break
      case body.name:
        error = 'name must be provided'
        break
      case body.email:
        error = 'email must be provided'
        break
      default:
        error = 'username, password, name and email must be provided'
        break
    }
    if (error) {
      return error;
    }
    if (body.username && body.password && body.name && body.email) {
      switch (true) {
        case body.username.length < 3:
          error = 'username must be at least 3 characters long'
          break
        case body.password.length < 3:
          error = 'password must be at least 3 characters long'
          break
        case body.name.length < 3:
          error = 'name must be at least 3 characters long'
          break
        case body.email.length < 3:
          error = 'email must be at least 3 characters long'
          break
        default:
          error = 'username, password, name and email must be at least 3 characters long'
          break
      }
    }
    if (error) {
      return error;
    }
  }
  return null;
};

export default newUserValidation;