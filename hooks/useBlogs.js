import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { blogService } from "../lib/services/blogService";

const LIMIT = 10;

export const postKeys = {
  all: ["posts"],
  lists: () => [...postKeys.all, "list"],
  list: (filters) => [...postKeys.lists(), filters],
  details: () => [...postKeys.all, "detail"],
  detail: (id) => [...postKeys.details(), id],
  search: (q) => [...postKeys.all, "search", q],
  tag: (tag) => [...postKeys.all, "tag", tag],
};

// Infinite scroll — feeds the home screen
export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: postKeys.lists(),
    queryFn: ({ pageParam = 0 }) => blogService.getPosts(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.length * LIMIT;
      return fetched < lastPage.total ? fetched : undefined;
    },
    initialPageParam: 0,
  });
}

// Single post
export function usePost(id) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => blogService.getPostById(id),
    enabled: !!id,
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => blogService.getTags(),
  });
}

// Posts by tag
export function usePostsByTag(tag) {
  return useQuery({
    queryKey: postKeys.tag(tag),
    queryFn: () => blogService.getPostsByTag(tag),
    enabled: !!tag,
  });
}

// Search posts
export function useSearchPosts(query) {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => blogService.searchPosts(query),
    enabled: query?.trim().length > 2,
  });
}

// Get author details (called inside post detail screen)
export function usePostAuthor(userId) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => blogService.getUserById(userId),
    enabled: !!userId,
  });
}

// Get comments for a post
export function usePostComments(postId) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => blogService.getCommentsByPostId(postId),
    enabled: !!postId,
  });
}
