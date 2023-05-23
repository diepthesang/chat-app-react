import Joi from "joi";
import {toast} from "react-toastify";


export const validateEmail = async (_email: { email: string }) => {
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email({tlds: {allow: false}}).required(),
        });
        return await emailSchema.validateAsync(_email);
    } catch (error) {
        console.log({error_validateEmail: error});
        toast.warn((error as any).message);
        return
    }
}