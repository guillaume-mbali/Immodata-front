import React, { useState, useEffect, useRef } from "react";

type Props = {
    steps: any,
    currentStep: any
}

const Stepper = ({ steps, currentStep }: Props) => {
    const [newStep, setNewStep] = useState([]);
    const stepsRef = useRef();

    const updateStep = (stepNumber: number, steps: any) => {
        const newSteps = [...steps];
        console.log(newSteps);
        let count = 0;
        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            }

            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }

        return newSteps;
    };

    useEffect(() => {
        const stepsState = steps.map((step: any, index: any) =>
            Object.assign(
                {},
                {
                    description: step,
                    completed: false,
                    highlighted: index === 0 ? true : false,
                    selected: index === 0 ? true : false,
                }
            )
        );

        stepsRef.current = stepsState;
        const current: any = updateStep(currentStep - 1, stepsRef.current);
        setNewStep(current);
    }, [steps, currentStep]);

    const stepsDisplay = newStep.map((step, index) => {
        return (
            <div
                key={index}
                className={
                    index !== newStep.length - 1
                        ? "w-full flex items-center"
                        : "flex items-center"
                }
            >
                <div className="relative flex flex-col items-center text-teal-600">
                    <div
                        className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 
                            ? "bg-green-600 text-white font-bold border border-green-600 "
                            : ""
                            }`}
                    >

                        {index + 1}

                    </div>
                    <div
                        className={`absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase text-gray-400`}
                    >

                    </div>
                </div>
                <div
                    className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 `}
                ></div>
            </div>
        );
    });

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {stepsDisplay}
        </div>
    );
};
export default Stepper;