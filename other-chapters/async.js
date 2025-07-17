console.log("Before");

// then  and catch approach
getUser(2)
  .then((user) => getRepositories(user.name))
  .then((repo) => getCommits(repo.repo[0]))
  .then((commit) => console.log(commit))
  .catch((err) => console.log(err));

// Async and Await approach
async function displayCommits() {
  console.log("async and await");

  try {
    const user = await getUser(2);
    const repos = await getRepositories(user.name);
    const commits = await getCommits(repos.repo[0]);

    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}

displayCommits();

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "John",
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: username,
        repo: ["repo1", "repo2", "repo3"],
      });
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${repo} commits`);
    }, 1000);
  });
}

console.log("After");
