const response = await fetch('http://127.0.0.1:8000/categories', {
  method: 'GET',
});
export const categories = await response.json();
