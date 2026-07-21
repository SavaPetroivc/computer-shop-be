import { NotFoundException } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./entity/product.entity";

describe("ProductService", () => {
  const serviceWith = (repository: Partial<Record<string, jest.Mock>>) =>
    new ProductService(repository as any, {} as any);

  describe("updateProduct", () => {
    it("baca gresku kada proizvod ne postoji", async () => {
      const save = jest.fn();
      const service = serviceWith({
        findOneBy: jest.fn(async () => null),
        save,
      });

      await expect(service.updateProduct({ id: 7 } as Product)).rejects.toThrow(
        NotFoundException,
      );
      expect(save).not.toHaveBeenCalled();
    });

    it("cuva izmenu sa id-jem svedenim na broj", async () => {
      const save = jest.fn(async (p) => p);
      const service = serviceWith({
        findOneBy: jest.fn(async () => ({ id: 7 })),
        save,
      });

      // ProductUpdateDto nosi id kao string
      await service.updateProduct({ id: "7", name: "RTX 5090" } as any);

      expect(save).toHaveBeenCalledWith({ id: 7, name: "RTX 5090" });
    });
  });
});
