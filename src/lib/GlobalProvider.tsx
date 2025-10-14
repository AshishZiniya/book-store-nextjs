'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, User, CartItem, GlobalContextType } from '@/types';


const users: User[] = [
  {
    id: 1,
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: "admin",
  },
  {
    id: 2,
    firstName: "Ashish",
    lastName: "Ziniya",
    email: "Ashishziniya@gmail.com",
    password: "Ashish123",
  },
];

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load books from database and user data from localStorage on mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const booksData = await response.json();
          setBooks(booksData);
          setFilteredBooks(booksData);
        }
      } catch (error) {
        console.error('Failed to load books:', error);
      }
    };

    loadBooks();

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser: User = {
        ...userData,
        id: users.length + 1,
      };

      users.push(newUser);
      setCurrentUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  };

  const updateCartItemQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.book.id === bookId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const searchBooks = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(query.toLowerCase())) ||
        book.categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value: GlobalContextType = {
    currentUser,
    cart,
    books,
    filteredBooks,
    searchQuery,
    selectedCategory,
    isLoading,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    searchBooks,
    filterByCategory,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
