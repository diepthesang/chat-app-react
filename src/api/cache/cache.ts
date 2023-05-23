import {useQuery} from "@tanstack/react-query";
import {Auth} from "../auth/auth";

export function useRoleCache() {
    console.log('____use role cache***')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(['role'], {
        queryFn: async () => await Auth.fetchRole(),
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false
    });
}

// export function useRetrieveAccessTokenByRefreshToken() {
//     console.log('____run retrieve access token')
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     return useQuery(['retrieve_access_token'], {
//         queryFn: async () => await Auth.retrieveAccessToken(),
//         cacheTime: Infinity,
//         staleTime: Infinity,
//         refetchOnWindowFocus: false,
//         refetchOnMount: false,
//         refetchIntervalInBackground: false
//     });
// }



