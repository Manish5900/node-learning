//There are three paterns to deal with asynchronous code

//1. Callbacks
//2. Promises
//3. Async/await

// 1. Callback: callback is a function that we are going to call when the result of an asyncronous operation is ready

// STEP:1 //
// // Asynchronous
// console.log("Before");
// getUser(1, (user) => {
//   getRepositories(user.githubUserName, (repositories) => {
//     getCommits(repositories[0], (commit) => {
//       console.log("Commits: ", commit);
//       // CALLBACK HELL
//     });
//   });
// });
// console.log("After");

// // Synchronous
// console.log("Before");
// const user = getUser(1);
// const repositories = getRepositories(user.githubUserName);
// const commit = getCommits(repositories[0]);
// console.log("Commits: ", commit);
// console.log("After");

// STEP:2 //
// console.log("Before");
// getUser(1, getRepositories);
// console.log("After");

// function getRepositories(user) {
//   getRepositories(user.githubUserName, getCommits);
// }
// function getCommits(repositories) {
//   getCommits(repositories[0], displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from a database");
//     callback({ id: id, githubUserName: "Manish5900" });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log("Calling Github API for username: ", username);
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// function getCommits(reponame, callback) {
//   setTimeout(() => {
//     console.log("Calling Github API to get commit for repos: ", reponame);
//     callback(["commit1", "commi2", "commi3"]);
//   }, 2000);
// }
