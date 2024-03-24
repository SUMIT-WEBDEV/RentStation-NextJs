// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// const { auth } = NextAuth(authConfig);
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";
// import { cookies } from "next/headers";

// export default auth((req) => {
//   const { nextUrl } = req;

//   const isLoggedIn = !!req.auth;
//   // console.log("Is loggedIn", isLoggedIn);
//   // console.log("Is nextUrl", nextUrl);

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   // Define a regex pattern to match dynamic routes
//   // const dynamicRoutePattern = /^\/item\/[^\/]+$/;
//   // const dynamicRoutePattern = /^\/([^\/]+)\/([^\/]+)$/;
//   // const dynamicRoutePattern = /^\/[^\/]+$/;
//   const dynamicRoutePatterns = [
//     /^\/item\/[^\/]+$/,
//     /^\/([^\/]+)\/([^\/]+)$/,
//     /^\/[^\/]+$/,
//   ];

//   // Check if the request URL matches the dynamic route pattern
//   const isDynamicRoute = dynamicRoutePatterns.some((pattern) =>
//     pattern.test(nextUrl.pathname)
//   );

//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return null;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     console.log("Request URL:", nextUrl.href);
//     console.log("Is public route:", isPublicRoute);

//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);
//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//     // return Response.redirect(new URL("/", nextUrl));
//   }

//   return null;
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import authConfig from "./auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { cookies } from "next/headers";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  // console.log("Is loggedIn", isLoggedIn);
  // console.log("Is nextUrl", nextUrl);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const dynamicRoutePatterns = [/^\/item\/[^\/]+$/, /^\/([^\/]+)\/([^\/]+)$/];

  // const restrictedRoutes = ["/sell", "/chat", "/myWishlist"];

  // Check if the route is one of the restricted routes
  const isRestrictedRoute =
    nextUrl.pathname === "/sell" ||
    nextUrl.pathname === "/chat" ||
    nextUrl.pathname === "/my-ads";

  // Check if the request URL matches the dynamic route pattern
  const isDynamicRoute = dynamicRoutePatterns.some((pattern) =>
    pattern.test(nextUrl.pathname)
  );

  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) || !isRestrictedRoute;

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("isLoggedIn is", isLoggedIn);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("Request URL:", nextUrl.href);
    console.log("Is public route:", isPublicRoute);

    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
    // return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
