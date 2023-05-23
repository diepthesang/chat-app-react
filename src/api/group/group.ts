import {http} from "../../utils/http";
import {validateMember} from "../../validation/member-validation";

export class Group {

    static async getConversationForGroupTwoMembers(memberId: string) {
        try {
            const valueMember = await validateMember({memberId});
            // kiem tra su ton tai cua valueMember
            if (!valueMember || Object.keys(valueMember).length === 0) return;
            return await http.get(`/group/member/${valueMember.memberId}`)
        } catch (error) {
            console.log({error_getConversationForGroupTwoMembers: error});
            throw  error
        }
    }

}