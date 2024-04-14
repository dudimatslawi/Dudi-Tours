import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { OkPacketParams } from "mysql2";
import { appConfig } from "../2-utils/app-config";

class VacationService {

    // get all vacations and likes from database
    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const sql = `
            SELECT DISTINCT
                V.*, CONCAT(?, V.imageName) as imageUrl,
                EXISTS(SELECT * FROM likes WHERE V.id = vacationId AND userId = ?) AS isLiked,
                COUNT(L.userId) AS likesCount
            FROM vacations as V LEFT JOIN likes as L
            ON V.id = L.vacationId
            GROUP BY id
            ORDER BY startDate
            `;
        const vacations = await dal.execute(sql, [appConfig.baseImageUrl, userId]);

        return vacations;
    }

    // get specific vacation by id:
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const sql = `SELECT *, CONCAT(?, imageName) as imageUrl FROM vacations WHERE id = ?`
        const vacations = await dal.execute(sql, [appConfig.baseImageUrl, vacationId]);
        const vacation = vacations[0];
        if (!vacation) throw new ResourceNotFoundError(vacationId);
        return vacation
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // validate the insert vacation:
        vacation.validateInsert();

        const imageName = await fileSaver.add(vacation.image);

        const sql = `INSERT INTO vacations(destination, description, startDate, endDate, price, imageName)
        VALUES(?,?,?,?,?,?)`;
        const info: OkPacketParams = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName]);
        vacation = await this.getOneVacation(info.insertId);
        return vacation
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        // validate updated vacation:
        vacation.validateUpdate();
        // get old image name:
        const oldImageName = await this.getImageName(vacation.id);

        // update image in the hard disc:
        const newImageName = vacation.image ? await fileSaver.update(oldImageName, vacation.image) : oldImageName;

        const sql = `UPDATE vacations SET
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE ID = ?
        `;
        const info: OkPacketParams = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, newImageName, vacation.id]);
        if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
        vacation = await this.getOneVacation(vacation.id);
        return vacation
    }

    public async deleteVacation(id: number): Promise<void> {
        // get image name:
        const imageName = await this.getImageName(id);

        // create sql:
        const sql = `DELETE from vacations where id = ?`;

        const info: OkPacketParams = await dal.execute(sql, [id]);

        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);


        // delete image from hared disc:
        await fileSaver.delete(imageName);

    }

    private async getImageName(id: number): Promise<string> {
        // create sql:
        const sql = `SELECT imageName FROM vacations WHERE id= ?`;
        // execute:
        const vacations = await dal.execute(sql, [id]);
        // extract product:
        const vacation = vacations[0];

        if (!vacation) return null;

        const imageName = vacation.imageName;

        return imageName
    }
}
export const vacationService = new VacationService();
