// Stand-in user for the sidebar user area and greeting until auth exists.

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "Alex Kim",
  email: "alex@devshelf.dev",
  image: null,
  isPro: true,
  createdAt: "2026-01-12T09:00:00.000Z",
  updatedAt: "2026-10-07T08:00:00.000Z",
};
