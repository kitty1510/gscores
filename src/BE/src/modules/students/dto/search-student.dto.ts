import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SearchStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Số báo danh không được để trống' })
  @Matches(/^\d{8}$/, { message: 'Số báo danh phải gồm 8 chữ số' })
  sbd: string;
}
