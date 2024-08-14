import * as https from 'https';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Coodinates;
}

interface Coodinates {
  lat: string;
  lng: string;
}

function start(word: string): void {
  console.log('Hello', word);
}

start(process.argv[2]);
const myO = { key: 'value' };
start(myO.key);

https
  .get('https://jsonplaceholder.typicode.com/users', (res) => {
    let data: Uint8Array[] = [];
    const headerDate =
      res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', (chunk) => {
      data.push(chunk);
    });

    res.on('end', () => {
      console.log('Response ended: ');
      const users = JSON.parse(Buffer.concat(data).toString()) as User[];

      for (const user of users) {
        console.log(
          `Got user with id: ${user.id}, name: ${user.address.geo.lat}`
        );
      }
    });
  })
  .on('error', (err) => {
    console.log('Error: ', err.message);
  });
