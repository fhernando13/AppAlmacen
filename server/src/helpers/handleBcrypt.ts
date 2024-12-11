const bcrypt = require('bcryptjs');

class HandleBCrypt{
    
    public encrypt(textpPlain: any){
        const hash = bcrypt.hash(textpPlain, 10)
        return hash
    };

    comparePass(plainPassword: string, hashPassword: string){
        return bcrypt.compare(plainPassword, hashPassword)
    };

}

const handleBCrypt = new HandleBCrypt();
export default handleBCrypt;