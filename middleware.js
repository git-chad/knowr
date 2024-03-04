import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
    },
  });

  // check user session
  const { user } = await supabase.auth.getUser();

  // protected routes redirection
  if (!user && (path === '/profile' || path === '/create')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // redirect logged in users to index
  if (user && path === '/login') {
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/create', '/login'],
};
