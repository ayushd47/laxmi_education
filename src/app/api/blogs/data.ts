export interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Use global variable to persist across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __blogsStore: BlogData[] | undefined;
}

// Initialize global store if it doesn't exist
if (typeof global !== 'undefined' && !global.__blogsStore) {
  global.__blogsStore = [];
}

// Getter function to always return the global store
function getBlogsStore(): BlogData[] {
  if (typeof global !== 'undefined') {
    if (!global.__blogsStore) {
      global.__blogsStore = [];
    }
    return global.__blogsStore;
  }
  return [];
}

// In-memory storage - in production, use a database
// Use global variable in development to persist across hot reloads
export const blogsStore = new Proxy([] as BlogData[], {
  get(target, prop) {
    const store = getBlogsStore();
    if (prop === 'push') {
      return function(...items: BlogData[]) {
        const result = store.push(...items);
        console.log('blogsStore.push - Store length after push:', store.length);
        return result;
      };
    }
    if (prop === 'findIndex') {
      return function(callback: (item: BlogData) => boolean) {
        return store.findIndex(callback);
      };
    }
    if (prop === 'find') {
      return function(callback: (item: BlogData) => boolean) {
        return store.find(callback);
      };
    }
    if (prop === 'splice') {
      return function(start: number, deleteCount?: number, ...items: BlogData[]) {
        const result = store.splice(start, deleteCount || 0, ...items);
        return result;
      };
    }
    if (prop === 'map') {
      return function(callback: (item: BlogData, index: number) => any) {
        return store.map(callback);
      };
    }
    if (prop === 'filter') {
      return function(callback: (item: BlogData) => boolean) {
        return store.filter(callback);
      };
    }
    if (prop === 'length') {
      return store.length;
    }
    if (typeof prop === 'number') {
      return store[prop];
    }
    return Reflect.get(store, prop);
  },
  set(target, prop, value) {
    const store = getBlogsStore();
    if (typeof prop === 'number') {
      store[prop] = value;
      return true;
    }
    return Reflect.set(store, prop, value);
  }
});



