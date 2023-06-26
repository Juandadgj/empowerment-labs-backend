
export class ProductDto {
  id: string;
  date: Date | string;
  data: any
}

export class CreateProductDto extends ProductDto {}
