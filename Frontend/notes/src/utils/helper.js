export const validEmail= (email)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
export const validPassword=(password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const getInitials=(name)=>{
    if(!name){
        return"";
    }
    let words= name.split(" ");
    let initials= "";
    for(let i=0; i< Math.min(words.length,2); i++){
        initials+= words[i][0];
    }
    return initials.toUpperCase();
}

// export default {validEmail, validPassword};
