import Joi from "joi";

export const validateMember = async (_member: { memberId: string }) => {
    console.log({_member})
    try {
        const memberSchema = Joi.object({
            memberId: Joi.string().guid({version: ['uuidv4', 'uuidv5']}).trim().required()
        });
        return await memberSchema.validateAsync(_member)
    } catch (error) {
        console.log({error_validateMember: error});
    }

}