export const batteryHealthCalc = (designCapacity: number, currentCapacity: number) => {
    const batteryHealth = 100 * currentCapacity / designCapacity;
    return batteryHealth.toFixed(2);
}