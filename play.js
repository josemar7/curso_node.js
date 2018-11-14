// // const name = "Pepo";
// // let age = 49;
// // const hasHobbies = true;
// // age = 30;

// // const summarizeUser = (userName, userAge, userHasHobby) => {
// //   return (
// //     "Name is " +
// //     userName +
// //     ", age is: " +
// //     userAge +
// //     ", and the user has hobbies: " +
// //     userHasHobby
// //   );
// // };


// // const add = (a, b) => a + b;
// // const addOne = a => a + 1;
// // const addRandom = () => 1 + 2;

// const person = {
//   name: 'Pepo',
//   age: 49,
//   greet() {
//     console.log('Hi, I am ' + this.name)
//   }
// };

// console.log(person);
// person.greet()

// const hobbies = ['Sports', 'Cooking'];
// const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2);
// // // for(let h of hobbies) {
// // //   console.log(h);
// // // }
// // console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// // // console.log(hobbies);
// // hobbies.push('Programming');
// // console.log(hobbies);
// // // const copiedArray = hobbies.slice();
// // const copiedArray = [...hobbies];
// // console.log(copiedArray);
// // const copiedPerson = {...person};
// // console.log(copiedPerson);

// // const toArray = (...args) => {
// //   return args;
// // };
// // console.log(toArray(1, 2, 3, 4, 5));

// const printName = ({name}) => {
//   console.log(name);
// };

// printName(person);

// const { name, age } = person;
// console.log(name, age);

// // console.log(add(4, 5));
// // console.log(addOne(4));
// // console.log(addRandom());

// // console.log(summarizeUser(name, age, hasHobbies));

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done');
    }, 1500);
  }); 
  return promise; 
};

setTimeout(() => {
  console.log('Timer is done');
  fetchData()
  .then(text => {
    console.log(text);
    return fetchData();
  })
  .then(text2 => {
    console.log(text2);
  });
}, 2000);

console.log('Hello');
console.log('Hi');