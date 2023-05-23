import {http} from "../../utils/http";
import {validateEmail} from "../../validation/email-validation";

export class User {
    
    static async fetchUserByUserId(userId: string) {
        try {
            return await http.get(`/user/${userId}`);
        } catch (error) {
            throw error
        }
    }

    static async findUserByEmail(email: string) {
        try {
            const valueEmail = await validateEmail({email});
            return await http.get(`/user/email/${valueEmail.email}`)
        } catch (error) {
            console.log({error_findUserByEmail: error});
            throw error
        }
    }

}