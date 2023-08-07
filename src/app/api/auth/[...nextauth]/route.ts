import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/utils/db/connectDB';
import User from '@/models/User';
import bcrypt from 'bcrypt';
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'Crendentials',
      name: 'Crendentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB(process.env.MONGO_URI as string);
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password as string,
              user.password,
            );
            if (isPasswordCorrect) return user;
            else {
              throw new Error('Wrong credentials');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (err) {
          throw new Error(err as unknown as any);
        }
      },
    }),
  ],
  pages: {
    error: '/dashboard/login',
  },
});

export { handler as GET, handler as POST };
