function fetchUser(userID, fetchUserPosts) {
  let users;

  fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.json())
    .then((usersData) => {
      users = usersData;
      let singleUser = users.find((user) => user?.id === userID);
      fetchUserPosts(singleUser);
    })
    .catch((err) => {
      console.log(`something went wrong while fetching user data`);
    });
}

function fetchAllPostOfAnUser(user, fetchSinglePost) {
  let userId = user?.id;
  let posts;

  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20`)
    .then((response) => response.json())
    .then((postsData) => {
      posts = postsData;
      let postsOfSingleUser = postsData.filter((post) => {
        return post?.userId === userId;
      });
      fetchSinglePost(postsOfSingleUser);
    })
    .catch(() => {
      console.log(`something went wrong while fetching user posts data`);
    });
}

function fetchSinglePost(postsOfAnUser, logToConsole) {
  let wantedPostID = 3;
  let fetchdePost;

  fetch(`https://jsonplaceholder.typicode.com/posts/${wantedPostID}`)
    .then((response) => response.json())
    .then((post) => {
      fetchdePost = post;
      logToConsole(fetchdePost);
    })
    .catch(() => {
      console.log(`something went wrong while fetching single Post Data`);
    });
}

fetchUser(1, (user) => {
  fetchAllPostOfAnUser(user, (postsOfSingleUser) => {
    fetchSinglePost(postsOfSingleUser[1], (post) => {
      console.log(post);
    });
  });
});
