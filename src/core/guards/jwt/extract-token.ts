import { Request } from "express";
import { AUTHORIZATION_HEADER } from "../../headers/headers";

/**
 * Isti redosled izvora kao u JwtStrategy: prvo kolacic, pa Bearer header.
 */
export function extractToken(request: Request): string | undefined {
  const fromCookie = request.cookies?.[AUTHORIZATION_HEADER];
  if (fromCookie) {
    return fromCookie;
  }

  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}
