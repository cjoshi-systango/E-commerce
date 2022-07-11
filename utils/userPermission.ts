import user from "../models/user";
import userRole from "../models/userRole";
class UserPermision{
    userPermissions(req: any) {
        return new Promise((resolve, reject) => {
            console.log(req.user.id);
            
            user.findByPk(req.user.id)
                .then(async (user: any) => {
                    await userRole.findByPk(user.userRoleId)
                        .then((userPermission: any) => {
                            resolve(userPermission);
                        })
                        .catch(err => {
                            reject(err) ;
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })

    }
}

const userPermission = new UserPermision;
export default userPermission;