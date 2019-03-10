import UserService from '../services/user.service';

class UserController {
  static createUser(req, res) {
    const newUser = req.body;
    const result = UserService.createUser(newUser);
    if (typeof result === 'string') {
      return res.status(201).json({
        status: 201,
        data: [
          {
            token: result
          }
        ],
        message: `New account created succesfully for ${req.body.firstName} ${req.body.lastName}`
      });
    }

    return res.status(500).json({
      status: 500,
      error: result,
      message: `Request Failed. Failed To create new account`
    });
  }

  static logUserIn(req, res) {
    const userCredentials = req.body;
    const bearerToken = UserService.logUserIn(userCredentials);
    if (bearerToken) {
      return res.status(200).json({
        status: 200,
        data: [
          {
            token: bearerToken
          }
        ],
        message: `Log in Successful. Welcome ${req.body.email}`
      });
    }

    const errorResponse = {
      status: 401,
      error: 'Authentication Failed. Incorrect Password',
      message: 'Request denied'
    };
    return errorResponse;
  }
}
export default UserController;
