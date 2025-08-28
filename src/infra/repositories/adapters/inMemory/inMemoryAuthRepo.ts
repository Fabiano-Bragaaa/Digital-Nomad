import { AuthUser } from "@/src/domain/auth/AuthUser";
import { IAuthRepo } from "@/src/domain/auth/IAuthRepo";
import { authUser } from "./data/authUsers";

export class InMemoryAuthRepo implements IAuthRepo {
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
