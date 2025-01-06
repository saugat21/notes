import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/db";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {


        async signIn({ profile }) {
            try {
                await connectDB();
                const userExists = await User.findOne({ email: profile.email });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture, // Use `picture` from Google profile
                    });
                }

                return true; // Allow sign-in
            } catch (error) {
                console.error("Error signing in:", error);
                return false; // Deny sign-in
            }
        },


        async session({ session, token }) {
            await connectDB();
            const sessionUser = await User.findOne({ email: session.user?.email });

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            } else {
                session.user.id = token.id; // Fallback for JWT session
            }

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
// Export the handler for HTTP methods
export { handler as GET, handler as POST };
