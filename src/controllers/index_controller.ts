import { Request, Response } from "express";

class IndexController{

    index(req: Request, res: Response){
        res.json({text: 'CONECTION SUCESSFUL'})
    }

}

export const indexController = new IndexController();