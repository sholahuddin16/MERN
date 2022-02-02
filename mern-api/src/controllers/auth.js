exports.register =(req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log('Your Account :', req.body=email);

    const result = {
        messege: 'Register Success',
        data: {
            uid: 1,
            name: name,
            email: email,
            password: password
        }
    }
    res.status(201).json(result);
}