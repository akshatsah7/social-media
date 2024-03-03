import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Meeting my best friend",
    body: "Feeling grateful for this beautiful day! ☀️ Enjoying a walk in the park with my best friend.",
    reactions: 28,
    userId: "user-9",
    tags: ["blessed", "friendshipgoals", "naturelover"],
  },
  {
    id: "2",
    title: "Reading Books",
    body: "Just finished reading this amazing book by J.K. Rowling.📖 It was so captivating and inspiring. I highly recommend it to anyone who loves fantasy and magic.",
    reactions: 18,
    userId: "user-12",
    tags: ["bookworm", "harrypotter","always"],
  },
  {
    id: "3",
    title: "Binge Watch",
    body: "Who else is excited for the new season of Stranger Things? I can’t wait to see what happens next in Hawkins.",
    reactions: 8,
    userId: "user-16",
    tags: ["strangerthings", "bingewatching","netflix","netflixindia"],
  },
  {
    id: "4",
    title: "Job Vaccancy",
    body: "Job openings in Bangalore, Pune, Hyderabad.💻 For more visit www.linkedin.com",
    reactions: 32,
    userId: "user-10",
    tags: ["linkedin", "jobopenings","interview"],
  },
];

export default PostListProvider;