type CalculatorState = {
    sum: number;
    action: string | null;
};

function parseInput(input: string): (string | number)[] {
    return input
        .trim() // Remove leading/trailing whitespace
        .split(/\s+/) // Split by one or more whitespace characters
        .map((item) => (isNaN(Number(item)) ? item : Number(item))); // Convert to number if possible
}

export const calc = (inputSequence: string): number => {
    let state: CalculatorState = {
        sum: 0,
        action: null,
    };

    let inputs = parseInput(inputSequence);

    inputs.forEach((input) => {
        if (typeof input === 'number') {
            // If the input is a number, process it based on the current action
            if (state.action) {
                switch (state.action) {
                    case '+':
                        state.sum += input;
                        break;
                    case '-':
                        state.sum -= input;
                        break;
                    case '*':
                        state.sum *= input;
                        break;
                    case '/':
                        if (input !== 0) {
                            state.sum /= input;
                        } else {
                            throw new Error("Division by zero is not allowed.");
                        }
                        break;
                }
                state.action = null; // Reset action after processing
            } else {
                // If no action is set, initialize the sum
                state.sum = input;
            }
        } else if (typeof input === 'string') {
            if (input === "=") {
                // End the calculation sequence
                return state.sum;
            } else if (input === "sq") {
                // Square root
                state.sum = Math.sqrt(state.sum);
            } else if (input.startsWith("^")) {
                // Power
                const power = parseInt(input.slice(1));
                state.sum = Math.pow(state.sum, power);
            } else if (input === "c") {
                // Clear and restart with the next number
                state.sum = 0;
            } else {
                // Set the next action
                state.action = input;
            }
        }
    });

    return state.sum;
}
