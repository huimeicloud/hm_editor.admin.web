
export class BasHospital {
  areaCode:string;
  医院名称:string;
  医院编码:string;
  院区编码:string;
  科室列表: BasDept[];
  院区列表: any[];
}

export class BasDept {
  科室ID: string;
  科室名称: string;
  医院编码: string;
  院区编码: string;
  科室类型: string;
}

export class EmrQualityInspect {
  _id: string;
  areaCode: string;
  总分: number;
  等级: string;
  质控级别: string;
  质控员ID: string;
  质控员姓名: string;
  质控时间: Date;
  质控明细: EmrQualityInspectDetail[];

  医院编码: string;
  院区编码: string;
  科室ID: string;
  病区ID: string;

  _id_patient: string;
  患者ID: string;
  住院号: string;
  病案号: string;
}

export class EmrQualityInspectDetail {
  扣分说明: string;
  扣分: number;
  重度缺陷: boolean;
  质控类型: string;
  病历ID: string;
  病历名称: string;
  _id_emrQualityRule: string;
}
