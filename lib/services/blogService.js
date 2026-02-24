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
  getPostsByTag: (tag) => api.get(`/posts/tag/${tag}`),

  // Search posts
  searchPosts: (query) => api.get(`/posts/search?q=${query}`),

  // Get user info for a post's author
  getUserById: (id) => api.get(`/users/${id}`),

  // Get comments for a post
  getCommentsByPostId: (postId) => api.get(`/posts/${postId}/comments`),
};
