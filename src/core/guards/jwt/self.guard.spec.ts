import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { SelfGuard } from "./self.guard";
import { AUTHORIZATION_HEADER } from "../../headers/headers";

describe("SelfGuard", () => {
  const context = (request: any): ExecutionContext =>
    ({
      switchToHttp: () => ({ getRequest: () => request }),
    }) as unknown as ExecutionContext;

  const request = (id: string) => ({
    cookies: { [AUTHORIZATION_HEADER]: "token" },
    headers: {},
    params: { id },
  });

  const guardWith = (verify: jest.Mock, findUserByUsername: jest.Mock) =>
    new SelfGuard({ verify } as any, { findUserByUsername } as any);

  const validToken = jest.fn(() => ({ username: "sava" }));

  it("odbija zahtev bez tokena", async () => {
    const guard = guardWith(jest.fn(), jest.fn());

    await expect(
      guard.canActivate(
        context({ cookies: {}, headers: {}, params: { id: "1" } }),
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it("odbija token sa neispravnim potpisom", async () => {
    const verify = jest.fn(() => {
      throw new Error("invalid signature");
    });
    const guard = guardWith(verify, jest.fn());

    await expect(guard.canActivate(context(request("1")))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("odbija izmenu tudjeg naloga", async () => {
    const findUser = jest.fn(async () => ({ id: 1, username: "sava" }));
    const guard = guardWith(validToken, findUser);

    await expect(guard.canActivate(context(request("9")))).rejects.toThrow(
      ForbiddenException,
    );
  });

  it("odbija id koji nije broj", async () => {
    const findUser = jest.fn(async () => ({ id: 1, username: "sava" }));
    const guard = guardWith(validToken, findUser);

    await expect(guard.canActivate(context(request("abc")))).rejects.toThrow(
      ForbiddenException,
    );
    expect(findUser).not.toHaveBeenCalled();
  });

  it("propusta izmenu sopstvenog naloga", async () => {
    const findUser = jest.fn(async () => ({ id: 1, username: "sava" }));
    const guard = guardWith(validToken, findUser);

    await expect(guard.canActivate(context(request("1")))).resolves.toBe(true);
    expect(findUser).toHaveBeenCalledWith("sava");
  });
});
