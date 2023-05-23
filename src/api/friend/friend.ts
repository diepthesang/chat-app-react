import {http} from "../../utils/http";

export class Friend {
    static async fetchFriendRelationshipStatus(userId: string) {
        return await http.get(`/friend/relationship_status/${userId}`)
    };

    static async addFriend(userId: string) {
        return await http.post('/friend/add_friend', {userId})
    }

    static async cancelFriendRequest(userId: string) {
        return await http.post('/friend/cancel_friend_request/', {userId})
    }

    static async blockUser(userId: string) {
        return await http.post('/friend/block_user', {userId})
    }

}