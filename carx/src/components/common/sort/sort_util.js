export const sortList = (type, dir, publicPosts, setPublicPosts) => {
  const arr = [...publicPosts];
  if (dir === "asc") {
    setPublicPosts(() =>
      arr.sort((a, b) => (a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0))
    );
  }
  if (dir === "desc") {
    setPublicPosts(() =>
      arr.sort((a, b) => (a[type] > b[type] ? -1 : b[type] > a[type] ? 1 : 0))
    );
  }
};
