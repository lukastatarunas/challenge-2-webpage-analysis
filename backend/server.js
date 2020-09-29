const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

let uniqueHtmlTags = [];
let mostUsedHtmlTag = "";

const getAllHtmlTags = (url) => {
  got(url)
    .then((response) => {
      const dom = new JSDOM(response.body);
      const allHtmlTags = dom.window.document.getElementsByTagName("*");
      getUniqueHtmlTags(allHtmlTags);
      mostUsedHtmlTag = getMostUsedHtmlTag(allHtmlTags);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUniqueHtmlTags = (arr) => {
  for (tag of arr) {
    if (!uniqueHtmlTags.includes(tag.tagName)) uniqueHtmlTags.push(tag.tagName);
  }
  return uniqueHtmlTags;
};

const getMostUsedHtmlTag = (arr) => {
  let counts = {};
  let maxValue = -1;
  let maxItem = null;
  for (const num of arr) {
    if (!(num in counts)) {
      counts[num] = 1;
    } else {
      counts[num] = counts[num] + 1;
    }
    if (counts[num] > maxValue) {
      maxValue = counts[num];
      maxItem = num;
    }
  }
  return maxItem;
};

module.exports = {
  getUniqueHtmlTags: getUniqueHtmlTags,
  getMostUsedHtmlTag: getMostUsedHtmlTag,
};

app.post("/unique", (req, res) => {
  getAllHtmlTags(req.body);
  if (uniqueHtmlTags.length) {
    res.send(uniqueHtmlTags);
  }
});

app.post("/commonly", (req, res) => {
  getAllHtmlTags(req.body);
  if (mostUsedHtmlTag) {
    res.send(mostUsedHtmlTag.tagName);
  }
});

app.post("/descendent", (req, res) => {
  getAllHtmlTags(req.body);
  res.send("descendent");
});

app.post("/most", (req, res) => {
  getAllHtmlTags(req.body);
  res.send("most");
});

const port = process.env.PORT || 5000;

app.listen(port);
