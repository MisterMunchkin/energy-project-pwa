import { ApplianceType } from "@/types/appliance.type";
import { BaseModel } from "./base.model";

export class ApplianceModel extends BaseModel<ApplianceType> {
  constructor() {
    super(ApplianceModel.name);
  }

}