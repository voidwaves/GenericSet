
class GenericSet<Type> {
    private values: Array<Type>

    private constructor() {
        this.values = []
    }

    // helper functions

    private static range(start: number, end: number): number[] {
        if(start == end) return [start]
        else if(start < end) return [start, ...GenericSet.range(start + 1, end)]
        else return [start, ...GenericSet.range(start - 1, end)]
    }

    // helper methods

    copy(): GenericSet<Type> {
        return GenericSet.from(...this.values)
    }

    private transform(func: (values: Array<Type>) => Array<Type>): GenericSet<Type> {
        const copy = this.copy()
        copy.values = func(copy.values)
        return copy
    }

    // chain starter methods

    static create<Type>(): GenericSet<Type> {
        return new GenericSet<Type>()
    }

    static from<Type>(...args: Type[]): GenericSet<Type> {
        return args.reduce((prev, curr) => prev.add(curr), GenericSet.create<Type>())
    }
    
    static fromRange(start: number, end: number): GenericSet<number> {
        const range = GenericSet.range(start, end)
        return GenericSet.from(...range)
    }

    // chain methods

    add(value: Type): GenericSet<Type> {
        return this.transform(values => values.includes(value) ? values : [...values, value])
    }

    addAll(...newValues: Array<Type>): GenericSet<Type> {
        return newValues.reduce((prev, curr) => prev.add(curr), this.copy())
    }

    addList(list: Array<Type>): GenericSet<Type> {
        return list.reduce((prev, curr) => prev.add(curr), this.copy())
    }

    remove(value: Type): GenericSet<Type> {
        return this.transform(values => values.filter(x => x != value))
    }

    intersection(other: GenericSet<Type>): GenericSet<Type> {
        return this.transform(values => values.filter(x => other.has(x)))
    }

    complementIn(other: GenericSet<Type>): GenericSet<Type> {
        return other.transform(values => values.filter(x => !this.has(x)))
    }

    removeIntersectionWith(other: GenericSet<Type>): GenericSet<Type> {
        return this.transform(values => values.filter(x => !other.has(x)))
    }

    union(other: GenericSet<Type>): GenericSet<Type> {
        return this.transform(values => values.reduce((prev, curr) => prev.add(curr), other.copy()).asList())
    }

    difference(other: GenericSet<Type>): GenericSet<Type> {
        return this.transform(() => [...this.removeIntersectionWith(other).asList(), ...this.complementIn(other).asList()])
    }

    // chain breaker methods

    size(): number {
        return this.values.length
    }

    has(value: Type): boolean {
        return this.values.includes(value)
    }

    isEqual(other: GenericSet<Type>): boolean {
        if(this.size() == other.size()) {
           return this.asList()
           .map(x => other.has(x))
           .reduce((prev, curr) => prev && curr)
        }
        else return false
    }

    isSubSet(other: GenericSet<Type>): boolean {
        if(this.size() < other.size()) {
            return this.asList()
           .map(x => other.has(x))
           .reduce((prev, curr) => prev && curr)
        }
        else return false
    }

    isSuperSet(other: GenericSet<Type>): boolean {
        if(this.size() > other.size()) {
            return other.asList()
           .map(x => this.has(x))
           .reduce((prev, curr) => prev && curr)
        }
        else return false
    }

    asList(): Array<Type> {
        return this.values
    }

    print() {
        console.log(this.values)
    }
}
