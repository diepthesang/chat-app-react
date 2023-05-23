import {http} from "../../utils/http";
import {FormSignUpType} from "../../types/form-sign-up.type";
import {FormSendOtpType} from "../../types/form-send-otp.type";
import {getBearerAccessToken} from "../../common/local-storage";
import {FormSignInType} from "../../types/form-sign-in.type";

export class Auth {

    static async signUp<T extends FormSignUpType>(formSignUp: T): Promise<T | any> {
        return await http.post<T>('/auth/sign_up', formSignUp);
    }

    static async fetchUser(userId: string) {
        return await http.get(`user/${userId}`)
    }

    static async fetchRole() {
        return await http.get('/auth/role', {
            headers: {Authorization: getBearerAccessToken()}
        })
    }

    static async sendOtp<T extends FormSendOtpType>(formSendOtp: T): Promise<T | any> {
        return await http.post<T>('/auth/send_otp', formSendOtp, {
            headers: {Authorization: getBearerAccessToken()}
        });
    }

    static async signIn<T extends FormSignInType>(formSignIn: T): Promise<any> {
        return await http.post<T>('/auth/sign_in', formSignIn)
    }

    static async retrieveAccessTokenByRefreshToken(bearerRefreshToken: string): Promise<any> {
        try {
            return await http.post('/auth/retrieve_access_token', {bearerRefreshToken});
        } catch (error) {
            console.log({err_retrieveAccessTokenByRefreshToken: error})
            throw error;
        }
    }

    static async signUpGoogle(): Promise<any> {
        return await http.get('/auth/google/callback');
    }

}



