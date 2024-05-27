import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const requiredFieldRegex = /.+/;
const userRegisterValidate = async(req, res, next) => {
    req.body.username = req.body.username.trim();
    req.body.email = req.body.email.trim();
    const schema = vine.object({
        username: vine.string().regex(requiredFieldRegex).minLength(3).maxLength(50).toLowerCase(),
        email: vine.string().regex(requiredFieldRegex).email(),
        password: vine.string().regex(requiredFieldRegex).minLength(4).maxLength(50).alphaNumeric()
    })

    vine.messagesProvider = new SimpleMessagesProvider({
        'regex': 'The {{ field }} field is required',
    })

    const validator = vine.compile(schema);
    try{
        const output = await validator.validate(req.body);
        next();
    }
    catch(error){
        res.status(400).json(error);
    }
      
}

const userLoginValidate = async(req, res, next) => {
    const schema = vine.object({
        email: vine.string().regex(requiredFieldRegex).email(),
        password: vine.string().regex(requiredFieldRegex).minLength(4).maxLength(50).alphaNumeric()
    })

    vine.messagesProvider = new SimpleMessagesProvider({
        'regex': 'The {{ field }} field is required',
    })

    const validator = vine.compile(schema);
    try{
        const output = await validator.validate(req.body);
        next();
    }
    catch(error){
        res.status(400).json(error);
    }
      
}

export { userRegisterValidate, userLoginValidate }
