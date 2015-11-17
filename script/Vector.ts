module Geometry {
    export interface IVector {
        add(vec: IVector): IVector;
        subtract(vec: IVector): IVector;
        magnitude(): number;
        scale(scaleVal: number): IVector;
        normalize(): IVector;
        negate(): IVector;
        dot(vec: IVector): number;
        cross(vec: IVector): IVector;
        toString(): String;         
        x(): number;
        y(): number;
        z(): number;
    }
}