///<reference path="Vector.ts" />

module Geometry {
    export class MutableVector implements IVector {
        private m_x:number;
        private m_y:number;
        private m_z:number;

        constructor(x:number, y:number, z:number) {
            this.m_x = x;
            this.m_y = y;
            this.m_z = z;
        }

        add(vec:IVector):IVector {
            this.m_x += vec.x();
            this.m_y += vec.y();
            this.m_z += vec.z();
            return this;
        }

        subtract(vec:IVector):IVector {
            this.m_x -= vec.x();
            this.m_y -= vec.y();
            this.m_z -= vec.z();
            return this;
        }

        magnitude():number {
            return Math.sqrt((this.m_x * this.m_x) + (this.m_y * this.m_y) + (this.m_z * this.m_z));
        }

        scale(scaleVal:number):IVector {
            this.m_x *= scaleVal;
            this.m_y *= scaleVal;
            this.m_z *= scaleVal;
            return this;
        }

        normalize():IVector {
            return this.scale((1.0 / this.magnitude()));
        }

        negate():IVector {
            return this.scale(-1.0);
        }

        dot(vec:IVector):number {
            return ( (this.m_x * vec.x()) + (this.m_y * vec.y()) + (this.m_z * vec.z()) );
        }

        cross(vec:IVector):IVector {
            let x = ( this.m_y * vec.z() ) - ( this.m_z * vec.y() );
            let y = ( this.m_z * vec.x() ) - ( this.m_x * vec.z() );
            let z = ( this.x() * vec.y() ) - ( this.m_y * vec.x() );
            this.m_x = x;
            this.m_y = y;
            this.m_z = z;
            return this;
        }
        
        toString(): String {
            return "" + this.m_x + ", " + this.m_y + ", " + this.m_z;
        }

        x():number {
            return this.m_x;
        }

        y():number {
            return this.m_y;
        }

        z():number {
            return this.m_z;
        }
    }
}