function validateLogin(login){
    const minLength = 4
    const maxLength = 30

    const loginTrim = login.trim()    
    if(loginTrim.length < minLength || loginTrim.length > maxLength){
        return {code: -1, message: `Проверьте длину логина(от ${minLength} до ${maxLength})`}
    }
    return {code: 0, message: `Логин верный`}
}

export default validateLogin