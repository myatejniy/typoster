export interface Poster {
  id: number;
  imageUrl: string;
  title: string;
  likes: number;
  isLiked: boolean;
  price: number;
  buyLink: string;
  tags: string[];
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface PosterContextType {
  posters: Poster[];
  addPoster: (poster: Omit<Poster, 'id' | 'likes' | 'isLiked'>) => void;
  deletePoster: (id: number) => void;
  handleLike: (id: number) => void;
  updatePosterTags: (id: number, tags: string[]) => void;
}

export interface AuthContextType {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}