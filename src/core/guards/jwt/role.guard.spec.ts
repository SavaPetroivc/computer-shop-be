import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { RoleGuard } from "./role.guard";
import { RoleName } from "../../../models/role/enums/role-name.enum";
import { AUTHORIZATION_HEADER } from "../../headers/headers";

describe("RoleGuard", () => {
  const context = (request: any): ExecutionContext =>
    ({
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => undefined,
      getClass: () => undefined,
    }) as unknown as ExecutionContext;

  const guardWith = (requiredRoles: string[], verify: jest.Mock) =>
    new RoleGuard(
      { getAllAndOverride: () => requiredRoles } as any,
      { verify } as any,
    );

  const withCookie = (token: string) => ({
    cookies: { [AUTHORIZATION_HEADER]: token },
    headers: {},
  });

  const admin = { role: RoleName.ADMINISTRATOR, activated: true };

  it("propusta rutu koja nema @Roles", () => {
    const verify = jest.fn();
    const guard = guardWith(undefined, verify);

    expect(guard.canActivate(context({ cookies: {}, headers: {} }))).toBe(true);
    expect(verify).not.toHaveBeenCalled();
  });

  it("odbija zahtev bez tokena", () => {
    const guard = guardWith([RoleName.ADMINISTRATOR], jest.fn());

    expect(() =>
      guard.canActivate(context({ cookies: {}, headers: {} })),
    ).toThrow(UnauthorizedException);
  });

  it("odbija token sa neispravnim potpisom", () => {
    const verify = jest.fn(() => {
      throw new Error("invalid signature");
    });
    const guard = guardWith([RoleName.ADMINISTRATOR], verify);

    expect(() =>
      guard.canActivate(context(withCookie("falsifikovan"))),
    ).toThrow(UnauthorizedException);
  });

  it("odbija korisnika sa pogresnom ulogom", () => {
    const verify = jest.fn(() => ({ role: RoleName.USER, activated: true }));
    const guard = guardWith([RoleName.ADMINISTRATOR], verify);

    expect(() => guard.canActivate(context(withCookie("token")))).toThrow(
      ForbiddenException,
    );
  });

  it("odbija neaktiviran nalog i sa ispravnom ulogom", () => {
    const verify = jest.fn(() => ({
      role: RoleName.ADMINISTRATOR,
      activated: false,
    }));
    const guard = guardWith([RoleName.ADMINISTRATOR], verify);

    expect(() => guard.canActivate(context(withCookie("token")))).toThrow(
      ForbiddenException,
    );
  });

  it("propusta aktiviran nalog sa trazenom ulogom", () => {
    const verify = jest.fn(() => admin);
    const guard = guardWith([RoleName.ADMINISTRATOR], verify);

    expect(guard.canActivate(context(withCookie("token")))).toBe(true);
    expect(verify).toHaveBeenCalledWith("token");
  });

  it("prihvata token iz Bearer header-a kada nema kolacica", () => {
    const verify = jest.fn(() => admin);
    const guard = guardWith([RoleName.ADMINISTRATOR], verify);

    const request = { cookies: {}, headers: { authorization: "Bearer token" } };

    expect(guard.canActivate(context(request))).toBe(true);
    expect(verify).toHaveBeenCalledWith("token");
  });
});
