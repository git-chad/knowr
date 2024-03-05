import { createServerClient } from "@supabase/ssr";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage.external";
import { NextResponse } from "next/server";
import { protectedPaths } from "./lib/constant";

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name, options) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  const { data } = await supabase.auth.getSession();
  const url = new URL(request.url);

  if (data.session) {
    if (url.pathname === "/auth") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  } else {
    if (protectedPaths.includes(url.pathname)) {
      return NextResponse.redirect(
        new URL("/auth?next=" + url.pathname, request.url)
      );
    }
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
