
export interface UserFormlist {
  uuid?: string;
  type: 1 | 2 | 3;
  username?: string;
  host?: string;
  password?: string;
}

export const defaultUserFormlist: Record<number, Omit<UserFormlist, 'type'>> = {
  1: {
    uuid:"",
    username: "",
    host: "",
    password: "",
  },
  2: {
    uuid: "",
    username: "",
    host: "",
    password: "",
  },
  3: {
    uuid: "",
    username: "",
    host: "",
    password: "",
  },
};
