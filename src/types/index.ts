// User role types
export type UserRole = "USER" | "ADMIN" | "MODERATOR";

// Extended user properties
export type ExtendedUser = {
  accessToken?: string;
  refreshToken?: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

// API Response types
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Login/Register request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

// Book store types
export interface Book {
  id: number;
  title: string;
  authors: string[];
  categories: string[];
  price: number;
  description?: string;
  shortDescription?: string;
  image?: string;
  thumbnailUrl?: string;
  isbn?: string;
  publishedDate?: string;
  publisher?: string;
  pages?: number;
  language?: string;
  rating?: number;
  stock?: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface GlobalContextType {
  currentUser: User | null;
  cart: CartItem[];
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateCartItemQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  searchBooks: (query: string) => void;
  filterByCategory: (category: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}
