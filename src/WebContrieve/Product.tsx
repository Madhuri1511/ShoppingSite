import React, { useEffect } from "react";
import MultiCheckbox from "./MultiCheckbox";

export const ProductInfo = () => {
    const myArray = [
        {
            nextarray: {
                age: [1, 2, 3],
                nextArray: {
                    age: [4, 5, 6],
                    nextArray: {
                        age: [7, 8, 9],
                        nextArray: {
                            age: [9, 10, 12],
                        },
                    },
                },
            },
        },
    ];

    const extractAges = (data: any): number[] => {
        let result: number[] = [];
        if (Array.isArray(data)) {
            console.log("yes its array")
            for (const item of data) {
                result = result.concat(extractAges(item));
            }
        } 
        else if (typeof data === "object" && data !== null) {
            // Check and add `age` array
      
            
            if (Array.isArray(data.age)) {
                result = result.concat(data.age);
            }
            // Recurse for `nextarray` and `nextArray`
            if (data.nextarray) {
                result = result.concat(extractAges(data.nextarray));
            }
            if (data.nextArray) {
                result = result.concat(extractAges(data.nextArray));
            }
        }
        return result;
    };

    useEffect(() => {
        console.log("myArray", myArray);
        console.log("Flattened ages:", extractAges(myArray));
    }, []);

    return <div >
        <MultiCheckbox/>
    </div>;
};
