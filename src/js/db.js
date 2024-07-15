//import Dexie from 'dexie';
//
//export const db = new Dexie('lklhjDB');

//db.version(1).stores({
//    friends: '++id, name, age',
//});
//
//db.friends.add({ name: '张三', age: 30 });
//db.friends.add({ name: '李四', age: 25 });
//db.friends.add({ name: '王五', age: 44 });
//
//db.friends
//  .where('age')
//  .above(28)
//  .toArray()
//  .then(friends => {
//    console.log('超过28岁的朋友:', friends);
//  });