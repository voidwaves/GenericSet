
// Some list related funtions immitating a standard library

export namespace List {

    // replace each element of a list
    export function map<Type>([head, ...tail]: Type[], func: (element: Type) => Type, result = []): Type[] {
        return (head != undefined) ? map(tail, func, [...result, func(head)]) : result
    }

    // run a function for each element of a list
    export function foreach<Type>([head, ...tail]: Type[], func) {
        if(head != undefined) {
            func(head)
            foreach(tail, func)
        }
    }

    // return a list only with elements matching the predicate function
    export function filter<Type>([head, ...tail]: Type[], func: (element: Type) => boolean, result = []): Type[] {
        return (head != undefined) ? filter(tail, func, [...result, ...( func(head) ? [head] : [] )]) : result
    }

    // return a sublist of a given list
    export function sublist<Type>([head, ...tail]: Type[], from: number, to: number, index = 0, result = []): Type[] {  
        return (head != undefined) ? sublist(tail, from, to, index + 1, [...result, ...((index >= from && index <= to) ? [head] : [])]) : result
    }

    // determine the length of a given list
    export function size<Type>([head, ...tail]: Type[], count = 0): number {
        return (head != undefined) ? size(tail, count + 1) : count
    }

    // reverse a given list
    export function reverse<Type>([head, ...tail]: Type[], result = []): Type[] {
        return (head != undefined) ? reverse(tail, [head, ...result]) : result
    }
}

