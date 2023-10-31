
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, role, token } = credentials;

        try {
          const user = {
            email: email,
            role: role,
          };

          if (!user) {
            // Any object returned will be saved in `user` property of the JWT
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const userData = {
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          profileImg: profile.picture,
        };
        try {
          const response = await axios.post(
            "https://pc-hub.vercel.app/api/v1/auth/provider-signup",
            userData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const token = response?.data?.data?.accessToken;
          const callbackUrl = `https://pc-hub.vercel.app/login?token=${token}`;
          return callbackUrl;
          
        } catch (error) {
          console.error("Error sending user data to the backend:", error);
        }
      }
      return true; 
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default authOptions;
