export function kelvinToCelcius(kelvin: number): number {
    const Celcius = kelvin - 273.15;
    return Math.floor(Celcius);
}