import { AuthUser } from "@/src/domain/auth/AuthUser";
import {
  AuthSignUpParams,
  AuthUpdatePasswordParams,
  AuthUpdateProfileParams,
  IAuthRepo,
} from "@/src/domain/auth/IAuthRepo";
import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

export class SupabaseAuthRepo implements IAuthRepo {
  async updatePassword(params: AuthUpdatePasswordParams): Promise<void> {
    const user = await this.getUser();
    await this.signIn(user.email, params.password);

    const { error } = await supabase.auth.updateUser({
      password: params.newPassword,
    });

    if (error) {
      throw new Error(error.message, { cause: error });
    }
  }
  async getUser(): Promise<AuthUser> {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      throw new Error(error?.message || "user not found", { cause: error });
    }

    return supabaseAdapter.toAuthUser(data.user);
  }
  async signIn(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message, { cause: error });
    }

    if (!data?.user) {
      throw new Error("unable to retrieve user after sign in");
    }

    return supabaseAdapter.toAuthUser(data.user);
  }

  async signUp(params: AuthSignUpParams): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          fullname: params.fullname,
        },
      },
    });

    if (error) {
      throw new Error(error.message, { cause: error });
    }

    return;
  }

  async updateProfile(params: AuthUpdateProfileParams): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      email: params.email,
      data: {
        fullname: params.fullname,
      },
    });

    if (error) {
      throw new Error(error.message, { cause: error });
    }
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
  async sendResetPasswordEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.EXPO_PUBLIC_WEB_URL}/reset-password`,
    });
    if (error) {
      throw new Error(error.message, { cause: error });
    }
  }
}
