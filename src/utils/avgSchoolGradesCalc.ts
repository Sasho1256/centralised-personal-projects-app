export const avgSchoolGradesCalc = (input: string): {} => {
    const grades: number[] = input.split(' ').map(Number);

    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const count = grades.length;

    const avg = sum / count;

    return {
        Sum: sum,
        Count: count,
        Avg: avg,
        Avg_f2: avg.toFixed(2),
    }
}