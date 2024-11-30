"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
console.log('Hello NodeJS - TS');
var Foo = /** @class */ (function () {
    function Foo(field1) {
        this.field1 = field1;
    }
    Foo.prototype.print = function () {
        console.log('Foo field1:', this.field1);
    };
    return Foo;
}());
exports.Foo = Foo;
var foo = new Foo(123);
foo.print();
