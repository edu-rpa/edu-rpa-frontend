export class ValidationError extends Error {
    public errorResponse: any
    constructor(message, response) {
      super(message);
      this.name = 'ValidationError'; // Set the name property of the error
      this.errorResponse = response
    }
}

export class UserCredentialError extends Error {
  public errorResponse: any
  constructor(message) {
    super(message);
    this.name = 'UserCredentialError'; // Set the name property of the error
  }
}

export class RobotCreationError extends Error {
  public errorResponse: any
  constructor(message) {
    super(message);
    this.name = 'RobotCreationError'; // Set the name property of the error
  }
}