import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: `https://lms-server-sigma.vercel.app/api/v1/`,
  }),
  tagTypes: [
    "userSignIN",
    "addUser",
    "updateUser",
    "deleteUser",
    "addCourse",
    "updateCourse",
    "deleteCourse",
    "addAgency",
    "updateAgency",
    "deleteAgency",
    "addReview",
    "updateReview",
    "deleteReview",
    "addQuiz",
    "updateQuiz",
    "deleteQuiz",
    "getCourses"
  ],

  endpoints: (builder) => ({
    // Users

    userLogin: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userSignIN"],
    }),

    userSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addUser"],
    }),

    userFromProviderSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/provider-signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addUser"],
    }),

    getAllUsers: builder.query({
      query: ({token}) => ({
        url: `/users`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["addUser", "updateUser", "deleteUser"],
    }),

    getSingleUser: builder.query({
      query: ({ email: userEmail, token: userToken }) => ({
        url: `/users/${userEmail}`,
        headers: {
          Authorization: `${userToken}`,
        },
      }),
      providesTags: ["addUser", "updateUser", "deleteUser", "userSignIN"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateUser"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["deleteUser"],
    }),

    // Courses

    getAllCourses: builder.query({
      query: ({
        page,
        limit,
        sortField,
        sortValue,
        searchField,
        searchValue,
      }) =>
        `/courses?page=${page}&limit=${limit}&${sortField}=${sortValue}&${searchField}=${searchValue}`,
      // `/courses`,
      providesTags: ["addCourse", "updateCourse", "deleteCourse"],
    }),
    getSingleCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ["addCourse", "updateCourse", "deleteCourse"],
    }),

    addCourse: builder.mutation({
      query: ({ data }) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addCourse"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateCourse"],
    }),
    deleteCourse: builder.mutation({
      query: ({ _id }) => ({
        url: `/courses/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteCourse"],
    }),
    getQuizzesByCourse: builder.query({
      query: ({ selectedCourse, token }) => ({
        url: `/quizzes/${selectedCourse}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["addQuiz", "updateQuiz", "deleteQuiz"],
    }),
    getReviewsByStudentId: builder.query({
      query: ({ studentId, token }) => ({
        url: `/reviews/student-reviews/${studentId}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["addReview", "updateReview", "deleteReview"],
    }),
    getReviewsByCourseId: builder.query({
      query: ({ courseId, token }) => ({
        url: `/reviews/${courseId}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["addReview", "updateReview", "deleteReview"],
    }),
    getAllAssignment: builder.query({
      query: ({token}) => ({
        url: `/assignments`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllAnnouncement: builder.query({
      query: ({token}) => ({
        url: `/announcements`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getOrdersByStudentId: builder.query({
      query: ({token, studentId}) => ({
        url: `/orders/by-student-id/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getOrdersByCourseId: builder.query({
      query: ({token, courseId}) => ({
        url: `/orders/by-course-id/${courseId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getWebFeedbackByStudentId: builder.query({
      query: ({token, studentId}) => ({
        url: `/web-feedbacks/student-feedback/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllWebFeedbacks: builder.query({
      query: ({token}) => ({
        url: `/web-feedbacks`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getBannerData: builder.query({
      query: ({token}) => ({
        url: `/home-banners`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllPromoCodes: builder.query({
      query: ({token}) => ({
        url: `/promocodes`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAnnouncementByStudentId: builder.query({
      query: ({token, studentId}) => ({
        url: `/announcements/student/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllLiveClasses: builder.query({
      query: ({token}) => ({
        url: `/live-courses`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getSingleLiveClassById: builder.query({
      query: ({token, id}) => ({
        url: `/live-courses/${id}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getQuizResultByStudentId: builder.query({
      query: ({courseId, studentId, token}) => ({
        url: `/quiz-results/${courseId}/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllLiveClassPayments: builder.query({
      query: ({courseId, token}) => ({
        url: `/live-class-payments/by-course-id/${courseId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAssignmentsByStudentId: builder.query({
      query: ({studentId, token}) => ({
        url: `/assignments/student/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getSubmittedAssignmentsByStudentId: builder.query({
      query: ({studentId, token}) => ({
        url: `/get-assignments/student/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getSubmittedAssignmentsByCourseId: builder.query({
      query: ({courseId, token}) => ({
        url: `/get-assignments/${courseId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAllAssignmentResultByCourseId: builder.query({
      query: ({courseId, token}) => ({
        url: `/assignment-results/${courseId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    }),
    getAssignmentResultByStudentId: builder.query({
      query: ({courseId, studentId, token}) => ({
        url: `/assignment-results/${courseId}/${studentId}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [],
    })
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserFromProviderSignUpMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useGetQuizzesByCourseQuery,
  useGetReviewsByStudentIdQuery,
  useGetReviewsByCourseIdQuery,
  useGetAllAssignmentQuery,
  useGetAllAnnouncementQuery,
  useGetOrdersByStudentIdQuery,
  useGetOrdersByCourseIdQuery,
  useGetWebFeedbackByStudentIdQuery,
  useGetAllWebFeedbacksQuery,
  useGetBannerDataQuery,
  useGetAllPromoCodesQuery,
  useGetAnnouncementByStudentIdQuery,
  useGetSingleLiveClassByIdQuery,
  useGetAllLiveClassesQuery,
  useGetQuizResultByStudentIdQuery,
  useGetAllLiveClassPaymentsQuery,
  useGetAssignmentsByStudentIdQuery,
  useGetSubmittedAssignmentsByStudentIdQuery,
  useGetSubmittedAssignmentsByCourseIdQuery,
  useGetAllAssignmentResultByCourseIdQuery,
  useGetAssignmentResultByStudentIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = api;
