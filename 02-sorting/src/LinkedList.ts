import { Sorter } from './Sorter';

class Node {
  next: Node | null = null;

  constructor(public data: number) {}
}

export class LinkedList extends Sorter {
  head: Node | null = null;
  
  get length(): number {
    if (!this.head) {
      return 0;
    }

    let len = 1;
    let tail = this.head;

    while (tail.next) {
      tail = tail.next;
      len++;
    }

    return len;
  }

  at(idx: number): Node {
    if (!this.head) {
      throw new Error('Out of bounds');
    }

    let counter = 0;
    let node: Node | null = this.head;

    while (node) {
      if (counter === idx) {
        return node;
      }
      counter++;
      node = node.next;
    }

    throw new Error('Out of bounds');
  }

  add(num: number): void {
    const node = new Node(num);

    if (!this.head) {
      this.head = node;
    } else {
      let tail = this.head;

      while (tail.next) {
        tail = tail.next;
      }
  
      tail.next = node;
    }
  }

  compare(i: number, j: number): boolean {
    if (!this.head) {
      throw new Error('List is empty');
    }

    return this.at(i).data > this.at(j).data;
  }

  swap(i: number, j: number): void {
    if (!this.head) {
      throw new Error('List is empty');
    }

    const first = this.at(i);
    const second = this.at(j);

    const tmp = first.data;
    first.data = second.data;
    second.data = tmp;
  }

  print(): void {
    if (!this.head) {
      return;
    }

    let node: Node | null = this.head;
    let output = `${node.data}`;

    while (node.next) {
      node = node.next;
      output = `${output} ${node.data}`;
    }
    console.log(output);
  }
}
