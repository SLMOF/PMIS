import { BaseModel } from "./baseModel";
import { DepartmentModel } from "./departmentModel";

export class VisitorsModel extends BaseModel {
  host: string = "";
  from?: string = "";
  fullName: string = "";
  nationalId?: string = "";
  visitType?: string = "";
  expectedDuration?: string = "";
  meetingOffice?: string = "";
  personAccompanying?: string = "";
  purpose: string = "";
  remarks?: string = "";
  gender: string = "";
  phone: string = "";
  visitorCard?: string = "";
  visitorDate: Date;
  imageURL?: string = "";
  status?: string = "";
  departmentId?: number;
  department?: DepartmentModel;
}
