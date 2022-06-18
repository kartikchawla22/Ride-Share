import validation, { isArray } from 'validate.js'
import constraints from './validation'

export default function validate(fieldName, value) {
    let result;
    var formValues = {}
    var formFields = {}
    if (isArray(fieldName) && isArray(value)) {
        for (let i = 0; i < fieldName.length; i++) {
            formValues[fieldName[i]] = value[i]
            formFields[fieldName[i]] = constraints[fieldName[i]]
        }
    } else {
        formValues[fieldName] = value
        formFields[fieldName] = constraints[fieldName]
    }


    result = validation(formValues, formFields)

    if (result && isArray(fieldName) && isArray(value)) {
        return result[fieldName[0]][0]
    }
    if (result) {
        return result[fieldName][0]
    }
    return null
}