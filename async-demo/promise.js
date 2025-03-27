// 2. Promise: A promise is an object which Holds the eventual result of an asynchronous operation

// asynchronous operation completes - then either reolved(fulfilled) or rejected, initially it is in pending state

// const p = new Promise((resolve, reject) => {
//   // Kick off some asynchronous work
//   // ...
//   console.log("Fetching data...");
//   setTimeout(() => {
//     // resolve(1);
//     reject(new Error("message"));
//   }, 2000);
// });

// p.then((result) => console.log("Result", result)).catch((err) =>
//   console.log("Error", err.messsage)
// );

// // Promise-based approach
console.log("Before");
getUser(1)
  .then((user) =>
    getRepositories(user.githubUserName).then((reponame) =>
      getCommits(reponame[0]).then((commit) => console.log("Commit", commit))
    )
  )
  .catch((err) => {
    console.log("Error", err.messsage);
  });
console.log("After");

// Async and await approach
console.log("Async and await approach Before");
async function displayComment() {
  try {
    const user = await getUser(1);
    const repositories = await getRepositories(user.githubUserName);
    const commits = await getCommits(repositories[0]);
    console.log("Commits: ", commits);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
displayComment();
console.log("Async and await approach After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    //Kick off some async work
    setTimeout(() => {
      console.log("Reading a user from a database");
      resolve({ id: id, githubUserName: "Manish5900" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    //Kick off some async work
    setTimeout(() => {
      console.log("Calling Github API for username: ", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(reponame) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API to get commit for repos: ", reponame);
      resolve(["commit1", "commit2", "commit3"]);
      // reject(new Error("Could not get repos."));
    }, 2000);
  });
}
