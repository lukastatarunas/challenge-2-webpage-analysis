const { getUniqueHtmlTags, getMostUsedHtmlTag } = require("./server");

test("get all unique items in the array", () => {
  expect(
    getUniqueHtmlTags([
      { tagName: "html" },
      { tagName: "head" },
      { tagName: "body" },
      { tagName: "div" },
      { tagName: "div" },
    ])
  ).toStrictEqual(["html", "head", "body", "div"]);
});

test("get the most used item in the array", () => {
  expect(getMostUsedHtmlTag([1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 6])).toBe(6);
});
