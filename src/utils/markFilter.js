export const markFilter = (marks = []) => {
  let pending = 0;
  let published = 0;
  marks.forEach((mark) => {
    if (mark.status === "pending") {
      pending++;
    }
    if (mark.status === "published") {
      published++;
    }
  });

  return {
    total: marks.length,
    pending,
    published,
  };
};
