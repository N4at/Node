console.log('Hello NodeJS - TS')

export class Foo{
    constructor(public field1: number) {}

    print(){
        console.log('Foo field1:', this.field1);

    }
}

let foo = new Foo(123);
foo.print();

