const getTodos = (resource, callback) => {

  return new Promise((resolve, reject) => {
    
    //http request
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject('could not fetch data');
      }
    });

    request.open('GET', resource);
    request.send();
  })
}

//promise chaining example
getTodos('todos/first.json').then(data => {
  console.log('promise 1 resolved: ', data);
  return getTodos('todos/second.json');
  }).then(data => {
    console.log('promise 2 resolved: ', data);
    return getTodos('todos/third.json');
  }).then(data => {
    console.log('promise 3 resolved: ', data);
  }).catch(err => { 
    console.log(err);
  });


// bad multiple requests example
/* 
getTodos('todos/first.json', (err, data) => {
  console.log(data);
  getTodos('todos/second.json', (err, data) => {
    console.log(data);
    getTodos('todos/third.json', (err, data) => {
        console.log(data);
    })
  })
}); 
*/

// promise example
/*
const getSomething = () => {
  return new Promise((resolve, reject) => {
    // fetch something
    resolve('some data');
    reject('some error')
  });
}
*/

// two parameters example
/*
getSomething().then((data) => {
  console.log(data);
}, (error) => {
  console.log(error)
})
*/

// good example
/*
getSomething().then(data => {
  console.log(data)
}).catch(error => {
    console.log(error)
})
*/