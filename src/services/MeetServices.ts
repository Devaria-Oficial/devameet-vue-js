import { HttpApiServices } from "./HttpApiServices";

export class MeetServices extends HttpApiServices{

    baseUrl = '/meet'

    async getMeets(){
        return await this.get(this.baseUrl);
    }

    async getMeetById(id:string){
        return await this.get(this.baseUrl+'/'+id);
    }

    async getObjectsById(id:string){
        return await this.get(this.baseUrl+'/objects/'+id);
    }

    async deleteMeet(id:string){
        return await this.delete(this.baseUrl+'/'+id);
    }

    async addMeet(body: any){
        return await this.post(this.baseUrl, body);
    }

    async update(id:string, body:any){
        return await this.put(this.baseUrl + '/' + id, body);
    }
}