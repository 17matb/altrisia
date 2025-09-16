export const getPosts = async (
  page,
  limit,
  postType = undefined,
  categoryId = undefined,
) => {
  let url = `http://127.0.0.1:8000/posts/?page=${page}&limit=${limit}`;
  if (postType !== undefined) {
    url += `&type_demande=${postType}`;
  }
  if (categoryId !== undefined) {
    url += `&category_id=${categoryId}`;
  }
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
