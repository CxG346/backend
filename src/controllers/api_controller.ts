import { Request, Response } from "express";

import pool from "../database";

class ApiController {
  //ACCOUNTS
  public async addData(req: Request, res: Response): Promise<void> {
    await pool.query("INSERT INTO dataprensa SET ?", [req.body]);

    res.json({ text: "Account added successfully" });
  }
  public async listLimitData(req: Request, res: Response): Promise<any> {
    const offset = parseInt(req.params.offset);
    const count = parseInt(req.params.count);
    const dataAccounts = await pool.query("SELECT * FROM dataprensa LIMIT ?, ?", [offset,count]);
    if (dataAccounts.length > 0) {
      return res.json(dataAccounts);
    }

    res.status(404).json({ text: "No accounts to show" });
  }
  public async getOne(req: Request, res: Response): Promise<any>{
    const {id} = req.params

    const dataAccounts = await pool.query("SELECT * FROM dataprensa WHERE id = ?", [id]);
    if (dataAccounts.length > 0) {
      return res.json(dataAccounts);
    }

    res.status(404).json({ text: "No accounts to show" });
  }
  public async listAllData(req: Request, res: Response): Promise<any> {
    const dataAccounts = await pool.query("SELECT * FROM dataprensa");
    if (dataAccounts.length > 0) {
      return res.json(dataAccounts);
    }

    res.status(404).json({ text: "No dataprensa to show" });
  }
  public async editData(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE dataprensa SET ? WHERE id = ?", [req.body, id]);

    res.json({ text: "Account edited successfully" });
  }
  public async deleteData(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE dataprensa WHERE id = ?", [id]);

    res.json({ text: "Account deleted successfully" });
  }
 
}

export const apiController = new ApiController();
