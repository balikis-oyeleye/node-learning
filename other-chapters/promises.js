const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("promises failed"));
  }, 2000);
});

p.then((result) => {
  console.log(result);
}).catch((error) => console.log(error.message));
