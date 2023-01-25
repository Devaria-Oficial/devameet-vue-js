import { HttpApiServices } from "./HttpApiServices";

export class RegisterServices extends HttpApiServices{
    async register(body: any){
        return await this.post('/auth/register', body);
    }
}