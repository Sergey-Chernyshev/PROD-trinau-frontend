function validatePassword(password){
    const pass = password.trim()
    const minLength = 4
    const maxLength = 256

    const hasNumber = /\d/.test(pass)
    const hasUpper = /[A-Z]/.test(pass)
    const hasLower = /[a-z]/.test(pass)
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)
    const hasLatin = /^[a-zA-Z]+$/.test(pass)

    // if (hasLatin) {
    //     return {code:-1, message: `Использованы недоступные симбволы`}
    // }
    // if (pass.length < minLength || pass.length > maxLength){
    //     return {code: -1, message:`Проверьте длину пароля(от ${minLength} до ${maxLength})`}
    // }
    // if (!hasNumber){
    //     return {code: -1, message:`Проверьте наличие цифры в пароле`}
    // }
    // if (!hasUpper){
    //     return {code: -1, message:`Проверьте наличие заглавной буквы в пароле`}
    // }
    // if (!hasLower){
    //     return {code: -1, message:`Проверьте наличие строчной буквы в пароле`}
    // }
    // if (!hasSpecial){
    //     return {code: -1, message:`Проверьте наличие специального симбвола в пароле`}
    // }
    return {code: 0, message:"пороль верный"}
}   

export default validatePassword;