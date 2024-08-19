export const errorHandler = (status, error, ...other) => {

    const foundError = new Error()
    foundError.status = status
    foundError.error = error
    foundError.otherInfo = other

    return foundError

}