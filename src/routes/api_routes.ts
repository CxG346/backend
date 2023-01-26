import { Router } from "express";
import { apiController } from "../controllers/api_controller";

class ApiRoutes {

    public router:Router = Router();

    constructor(){
        this.config()
    }

    config(): void{
        //Accounts
        this.router.post('/addData', apiController.addData);
        this.router.get('/limitData/:offset/:count', apiController.listLimitData);
        this.router.get('/listData', apiController.listAllData);
        this.router.get('/getOne/:id', apiController.getOne);
        this.router.put('/editData/:id', apiController.editData);
        this.router.delete('/deleteData/:id', apiController.deleteData);
        //Stream


    }
}

const apiRoutes = new ApiRoutes
export default apiRoutes.router;