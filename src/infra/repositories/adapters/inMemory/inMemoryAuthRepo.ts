import { AuthUser } from "@/src/domain/auth/AuthUser";
import { AuthSignUpParams, IAuthRepo } from "@/src/domain/auth/IAuthRepo";
import { authUser } from "./data/authUsers";

export class InMemoryAuthRepo implements IAuthRepo {
  async signUp(params: AuthSignUpParams): Promise<void> {
    const userAlreadyExists = authUser.find(user => user.email === params.email);
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    return
  }
  async sendResetPasswordEmail(email: string): Promise<void> {
    console.log("Sending reset password email to", email);
  }
  async signOut(): Promise<void> {
    //TODO
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    const user = authUser.find(user => user.email === email);
    if (user) {
      return user;
    }

    throw new Error("User not found");
  }
}
