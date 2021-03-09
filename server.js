const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const { FB, FacebookApiException } = require("fb");

let facebookCache;
resetCache();

setInterval(() => resetCache(), 60 * 60 * 1000)

app.get("/", (req, res) => {
  res.send(facebookCache);
});

async function resetCache() {
  FB.setAccessToken(process.env.TOKEN);
  let parsedPosts = [];
  console.log("Fetching posts...");
  const posts = await new Promise((resolve1) => {
    FB.api("561953477563915/posts", async (posts) => {
      if (!posts || posts.error) {
        console.log(!posts ? "error occurred" : posts.error);
        return;
      }

      for (let i = 0; i < posts.data.length; i++) {
        console.log("Fetching post " + posts.data[i].id);
        const post = posts.data[i];

        parsedPosts.push(
          await new Promise((resolve2) => {
            FB.api(post.id + "/attachments", (attachments) => {
              const parsedPost = {
                image: attachments.data[0].media.image,
                message: post.message,
                id: post.id,
              };

              resolve2(parsedPost);
            });
          })
        );
      }

      resolve1(parsedPosts);
    });
  });

  facebookCache = posts;


}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
