import { IsOptional, IsEnum, IsString } from 'class-validator'
import { STATUS } from "../task-status.enum";

export class filterTaskDto{
    @IsOptional()
    @IsEnum(STATUS)
    status?: STATUS;

    @IsOptional()
    @IsString()
    search?: string;
}