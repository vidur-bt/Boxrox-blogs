import api from "../api";

export const blogService = {
  // Get paginated posts (uses skip-based pagination)
  getPosts: (skip = 0, limit = 10) =>
    api.get(`/posts?limit=${limit}&skip=${skip}`),

  // Get single post
  getPostById: (id) => api.get(`/posts/${id}`),

  // Get tags
  getTags: () => api.get("/posts/tags"),

  // Get posts by tag
  getPostsByTag: (tag, skip = 0, limit = 10) =>
    api.get(`/posts/tag/${tag}?limit=${limit}&skip=${skip}`),

  // Search posts
  searchPosts: (query, skip = 0, limit = 10) =>
    api.get(`/posts/search?q=${query}&limit=${limit}&skip=${skip}`),

  // Get user info for a post's author
  getUserById: (id) => api.get(`/users/${id}`),

  // Get comments for a post
  getCommentsByPostId: (postId) => api.get(`/posts/${postId}/comments`),
};
