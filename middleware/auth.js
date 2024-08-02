import jwt from 'jsonwebtoken'


export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
       try {
         // Extect the token from the header
         const token = req.headers.authorization.split(' ')[1];
         //Verify the token to get user and appen to request
         req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
         // call next function
         next();
       } catch (error) {
        return res.status(401).json({error: "Token Expired"});
       }
    }
    else {
        return res.status(401).json({error:'Not authenticated'})
    }
}

