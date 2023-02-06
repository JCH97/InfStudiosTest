import { BaseProps, IDomain } from '../core/interfaces/IDomain';

/**
 * @description Class for management all entities inside application.
 */
export abstract class Domain<T extends BaseProps> implements IDomain {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
  }

  equals(domain: Domain<T>): boolean {
    if (!domain || !domain.props) return false;

    return JSON.stringify(domain.equals) === JSON.stringify(this.props);
  }
}
