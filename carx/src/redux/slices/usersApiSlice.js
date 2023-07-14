import { apiSlice } from "./apiSlice";
let USERS_URL;
if (process.env.NODE_ENV === "production") {
  USERS_URL =
    "http://ec2-18-217-180-76.us-east-2.compute.amazonaws.com/api/users";
} else {
  USERS_URL = "http://localhost:5000/api/users";
}
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getUser: builder.mutation({
      query: (cookie) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer jwt=${cookie.jwt}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        headers: {
          Authorization: `Bearer jwt=${data.cookie.jwt}`,
        },
        body: data.formData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete`,
        method: "POST",
        headers: {
          Authorization: `Bearer jwt=${data.cookie.jwt}`,
        },
      }),
    }),
    updateListing: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "POST",
        headers: {
          Authorization: `Bearer jwt=${data.cookie.jwt}`,
        },
        body: data.formData,
      }),
    }),
    postListing: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "POST",
        headers: {
          Authorization: `Bearer jwt=${data.cookie.jwt}`,
        },
        body: data.formData,
      }),
    }),
    deleteListing: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/post`,
        method: "PUT",
        headers: {
          Authorization: `Bearer jwt=${data.cookie.jwt}`,
        },
        body: data.formData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  usePostListingMutation,
  useDeleteListingMutation,
} = userApiSlice;
