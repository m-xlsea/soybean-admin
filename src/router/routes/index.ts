import type { AutoRouterRedirect, AutoRouterRoute } from '@elegant-router/types';
import { routes } from '../_generated/routes';
import { layouts, views } from '../_generated/imports';
import { transformToVueRoutes } from '../_generated/transformer';

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: AutoRouterRoute[] = [];
  const authRoutes: AutoRouterRoute[] = [];

  let rootRoute: AutoRouterRedirect | undefined;

  routes.forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }

    if (item.name === 'Root') {
      rootRoute = item as AutoRouterRedirect;
    }
  });

  return {
    constantRoutes,
    authRoutes,
    rootRoute: rootRoute as AutoRouterRedirect
  };
}

/**
 * Get auth vue routes
 *
 * @param authRoutes Elegant routes
 */
export function getAuthVueRoutes(authRoutes: AutoRouterRoute[]) {
  return transformToVueRoutes(authRoutes, layouts, views);
}
