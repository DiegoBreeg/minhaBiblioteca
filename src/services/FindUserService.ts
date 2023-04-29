import { Users } from "../database/models/User";

class FindUserService {
    async execute(params: any): Promise<Array<any>> {
        console.log("FindUserService/Params: ",params)
        if (!params.UserName) {
            const data = await Users.find({})
            console.log("FindUserService/Data: ", data)
            return  data
        }        
        const data = await Users.find(params || {})
        if (data.length == 0)
            return [{ message: "no user found" }]
        console.log("FindUserService/Data: ", data)
        return data
    }
}

export { FindUserService }