import {Role} from '@classes/enums/role.model';

export interface Session {
  token: string;
  mobile?: number;
  name?: string;
  role?: Role;
}
