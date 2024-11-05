import { ApplianceType } from "@/types/appliance.type";
import { BaseModel } from "./base.model";

/** *Class instance of PublicLeaderboard data cached in node-cache. 
 extends BaseModel

 Why does this exist you ask? because the API still makes use of the 
 extended methods within the BaseModel for this specific model.

it's use case is simple enough that it doesn't need custom methods
or util methods to give the API the data it needs. requirements
for this model is primarily just to retrieve all appliances stored in node-cache
But if requirements change and things need updating, its cool how we can do that easily here

 */
export class ApplianceModel extends BaseModel<ApplianceType> {
  /**
   * Creates an instance of ApplianceModel.
   *
   * @constructor
   */
  constructor() {
    super(ApplianceModel.name);
  }
}
