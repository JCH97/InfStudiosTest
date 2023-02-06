import { Prop } from '@typegoose/typegoose';

/**
 * @description Class base for persist entities in DB only
 */

export abstract class PersistEntity {
  _id?: string;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}
