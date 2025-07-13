const p1 = new Promise((resolve) => {
  resolve("p1");
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("Promise rejected"));
});

Promise.allSettled([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
