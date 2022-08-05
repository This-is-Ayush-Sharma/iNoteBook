const crypt = require('bcrypt');


exports.encode = async (password)=>{
    return crypt.hash(password,2);
}

exports.decode = async (hash,password)=>{
    return crypt.compare(password,hash);
}
