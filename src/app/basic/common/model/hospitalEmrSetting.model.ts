import { BasHospital } from './baseHospital.model';

import {EmrSetting} from "./emrSetting.model";

export class HospitalEmrSetting extends BasHospital{
  emrSettingList: EmrSetting[];
}
