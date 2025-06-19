import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";


export type TUser = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: string;
}

export const usersAPI = createApi({ // sets up API endpoints for user management - creating users and verifying them etc
    reducerPath: 'usersAPI', // this is the key in the store where the API state will be stored - name of the API in the store
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain // base URL for the API - this is the domain where the API is hosted
    }), // base query function that will be used to make requests to the API

    // used to invalidate the cache when a mutation is performed 
    //  it helps to keep the data fresh in the cache, that is to mean that when a user is created, the cache is invalidated so that the next time the users are fetched, the new user is included in the list.
    tagTypes: ['Users'], // tag types for invalidation 
    endpoints: (builder) => ({ //builder is a function that helps to define the endpoints for the API
        createUsers: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // invalidates the cache for the Users tag when a new user is created
        }),
        verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
            query: (data) => ({
                url: '/auth/verify',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

