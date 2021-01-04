import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

// array
const numbersCollection = new NumbersCollection([1, 8, 5, -10]);
numbersCollection.sort();
console.log(numbersCollection.data);

// string
const charactersCollection = new CharactersCollection('DcaBZq');
charactersCollection.sort();
console.log(charactersCollection.data);

// linked list
const list = new LinkedList();
list.add(1);
list.add(10);
list.add(5);
list.add(-7);

list.print();
list.sort();
list.print();
