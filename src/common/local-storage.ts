export const getBearerAccessToken = (): string | null | undefined => localStorage.getItem('access_token') as string;

export const getBearerRefreshToken = (): string | null | undefined => localStorage.getItem('refresh_token') as string;

export const getRole = (): string | null | undefined => localStorage.getItem('role') as string

export const getTimeCountDown = (): Number => Number(localStorage.getItem('time_count_down'));

export const getUserId = (): string | null => localStorage.getItem('user_id');

export const getReceiverId = () => localStorage.getItem('receiver_id');

export const getLastConversationId = (): string | null | undefined => localStorage.getItem('last_conversation_id');
