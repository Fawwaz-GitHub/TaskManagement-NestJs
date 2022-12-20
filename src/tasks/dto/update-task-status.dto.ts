import { STATUS } from "../task-status.enum";
import { IsEnum } from "class-validator"

export class updateTaskStatusDto {
    @IsEnum(STATUS)
    status: STATUS;
}