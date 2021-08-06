const maxPostPage = 8;
export const fetchPosts = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${maxPostPage}`
  );
  return response.json();
};

export const deletePost = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: "DELETE" }
  );
  return response.json();
};
