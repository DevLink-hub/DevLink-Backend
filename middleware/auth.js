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



// export const hasPermission = (permission) => {
//     return async (req, res, next) => {
//         try {
//             // Get user id from session or request
//             const id = req.session?.user?.id || req?.user?.id;
//             // Find user by id
//             const user = await userModel.findById(id);
//             // Find user role with permissions
//             const userRole = roles.find(element => element.role === user.role);
//             // Use role to check if user has permission
//             if (userRole && userRole.permissions.includes(permission)) {
//                 next();
//             } else {
//                 res.status(403).json('Not Authorized!');
//             }
//         } catch (error) {
//             next(error);
//         }
//     }
// }