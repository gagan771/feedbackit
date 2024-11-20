import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { authOptions } from './options';


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 