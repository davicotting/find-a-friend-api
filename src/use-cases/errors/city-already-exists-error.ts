
export class CityAlreadyExistsError extends Error {
    constructor(){
        super("City Already exists.");
    }
}