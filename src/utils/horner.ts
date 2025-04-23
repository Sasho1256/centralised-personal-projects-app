const findPosX = (coeffs: number[]): number[] => {
    const masterCoef = coeffs[0];
    const freeMember = coeffs[coeffs.length - 1];

    const posP: number[] = [];
    const posQ: number[] = [];
    const posX: number[] = [];

    for (let i = 1; i <= Math.abs(masterCoef); i++) {
        if (masterCoef % i === 0) {
            posQ.push(i, -i);
        }
    }

    for (let i = 1; i <= Math.abs(freeMember); i++) {
        if (freeMember % i === 0) {
            posP.push(i, -i);
        }
    }

    for (const p of posP) {
        for (const q of posQ) {
            if (q === 0) {
                console.error('Can\'t divide by 0!');
                continue;
            }
            const val = p / q;
            if (!posX.includes(val)) {
                posX.push(val);
            }
        }
    }

    return posX;
}

const visualizedPosX = (coeffs: number[]): string[] => {
    const masterCoef = coeffs[0];
    const freeMember = coeffs[coeffs.length - 1];

    const posP: number[] = [];
    const posQ: number[] = [];
    const posX: string[] = [];

    for (let i = 1; i <= Math.abs(masterCoef); i++) {
        if (masterCoef % i === 0) {
            posQ.push(i, -i);
        }
    }

    for (let i = 1; i <= Math.abs(freeMember); i++) {
        if (freeMember % i === 0) {
            posP.push(i, -i);
        }
    }

    for (const p of posP) {
        for (const q of posQ) {
            if (q === 0) {
                console.error('Can\'t divide by 0!');
                continue;
            }
            const div = p / q;
            if (Number.isInteger(div) && !posX.includes(div.toString())) {
                posX.push(div.toString());
            } else if (!Number.isInteger(div)) {
                const vis = `${p}/${q}`;
                const rev = `${-p}/${-q}`;
                if (!posX.includes(vis) && !posX.includes(rev)) {
                    posX.push(vis);
                }
            }
        }
    }

    return posX;
}

export const hornerFactorization = (input: string): string[] => {
    const coeffs = input
        .trim()
        .split(',')
        .map(Number)
        .filter((x) => !isNaN(x)); ``

    if (coeffs.length === 0) {
        console.error("Invalid input");
        return ['Invalid input'];
    }

    let koef = [...coeffs];
    const posX = findPosX(koef);
    const visPosX = visualizedPosX(koef);

    const workingX: string[] = [];
    const result: string[] = [];

    result.push(`Possible X: ${visPosX.join("; ")}`);
    result.push("Horner scheme:");
    result.push(`# | ${koef.join("; ")} |`);

    for (let i = 0; i < posX.length; i++) {
        const nowUsed: number[] = [koef[0]];

        for (let j = 1; j < koef.length; j++) {
            const tableNum = posX[i] * nowUsed[j - 1] + koef[j];
            nowUsed.push(tableNum);
        }

        result.push(`${visPosX[i]} (${nowUsed.join("; ")})`);

        if (Math.abs(nowUsed[nowUsed.length - 1]) < 1e-9) {
            workingX.push(visPosX[i]);
            koef = nowUsed.slice(0, -1); // Remove last element
        }
    }

    result.push(`Working X: ${workingX.length ? workingX.join("; ") : 'none'}`);


    return result;
}
