// creating settled promises

const p = Promise.resolve({id: 1});
p.then(result => console.log(result));

const p2 = Promise.reject(new Error('reason for rejection...'));
p.catch(error => console.log(error));

// parellel promises
const p3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p4 = new Promise((resolve, reject) => {
    setTimeout( () => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

Promise.all([p3,p4]) //return only all resolve
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

Promise.race([p3,p4]) // return the first one that resolves
.then(result => console.log(result))
.catch(err => console.log('Error', err.message));