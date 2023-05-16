import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDashboardDto {
  // @IsString()
  // @IsNotEmpty()
  name: string;
}
