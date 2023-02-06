import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const Permits = (...permits: string[]): CustomDecorator =>
  SetMetadata("permits", permits);
