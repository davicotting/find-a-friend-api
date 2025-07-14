
export class CityNotExistsError extends Error {
    constructor(){
        super("City not exists.");
    }
}