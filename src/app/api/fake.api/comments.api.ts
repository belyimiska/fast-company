export type CommentType = {
  _id: string;
  userId: string;
  pageId: string;
  content: string;
  created_at: string;
};

type NewCommentType = Omit<CommentType, "_id" | "created_at">;

const comments: CommentType[] = [
  {
    _id: "67rdca3eeb7f6fg",
    userId: "67rdca3eeb7f6fgeed471815",
    pageId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor",
    created_at: "1633576399367",
  },
  {
    _id: "67rdca3eeb7f6fgdasd",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor and etc",
    created_at: "1633573058520",
  },
  {
    _id: "67rdca3eeb7f6fgdaasd",
    pageId: "67rdca3eeb7f6fgeed471817",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor and etc",
    created_at: "1633573058520",
  },
];
if (!localStorage.getItem("comments")) {
  localStorage.setItem("comments", JSON.stringify(comments));
}
const fetchAll = () =>
  new Promise<CommentType[]>((resolve) => {
    window.setTimeout(function () {
      const commentsString = localStorage.getItem("comments");
      const parsedComments: CommentType[] = commentsString ? JSON.parse(commentsString) : [];
      resolve(parsedComments);
    }, 200);
  });

const fetchCommentsForUser = (userPageId: CommentType["pageId"]) =>
  new Promise<CommentType[] | undefined>((resolve) => {
    window.setTimeout(function () {
      const commentsString = localStorage.getItem("comments");
      if (commentsString !== null) {
        const parsedComments: CommentType[] = JSON.parse(commentsString);
        resolve(parsedComments.filter((c) => c.pageId === userPageId));
      } else {
        resolve(undefined);
      }
    }, 800);
  });

const add = (data: NewCommentType) =>
  new Promise<CommentType | undefined>((resolve) => {
    window.setTimeout(function () {
      const commentsString = localStorage.getItem("comments");
      if (commentsString === null) return resolve(undefined);

      const comments: CommentType[] = JSON.parse(commentsString);
      const newComment: CommentType = {
        ...data,
        created_at: Date.now().toString(),
        _id: Math.random().toString(36).substr(2, 9),
      };
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      resolve(newComment);
    }, 500);
  });

const remove = (id: CommentType["_id"]) =>
  new Promise<CommentType["_id"] | undefined>((resolve) => {
    window.setTimeout(function () {
      const commentsString = localStorage.getItem("comments");
      if (commentsString === null) return resolve(undefined);

      const comments: CommentType[] = JSON.parse(commentsString);
      const newComments = comments.filter((x) => x._id !== id);
      console.log(id);
      console.log(newComments);
      localStorage.setItem("comments", JSON.stringify(newComments));
      resolve(id);
    }, 200);
  });

const commentsApi = {
  fetchAll,
  fetchCommentsForUser,
  add,
  remove,
};

export default commentsApi;
