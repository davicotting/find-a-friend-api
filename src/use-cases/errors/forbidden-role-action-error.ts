export class ForbiddenRoleActionError extends Error {
  constructor() {
    super("Your role does not allow you to perform this action.");
  }
}
