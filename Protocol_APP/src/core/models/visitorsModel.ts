import { BaseModel } from "./baseModel";
import { DepartmentModel } from "./departmentModel";

export class VisitorsModel extends BaseModel {
  Host: string = "";
  From?: string = "";
  FullName: string = "";
  NationalId?: string = "";
  VisitType?: string = "";
  ExpectedDuration?: string = "";
  MeetingOffice?: string = "";
  PersonAccompanying?: string = "";
  Purpose: string = "";
  Remarks?: string = "";
  Phone: string = "";
  VisitorCard?: string = "";
  VisitorDate: Date;
  ImageURL?: string = "";
  DepartmentId?: number;
  Department?: DepartmentModel;
}
