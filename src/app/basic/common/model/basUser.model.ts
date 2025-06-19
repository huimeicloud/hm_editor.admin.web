export  class BasUser {
  areaCode:string;
  用户ID: string;
  用户名: string;
  登陆帐号:string;
  医院编码:string;
  院区编码:string;
  医院名称:string;
  科室列表:UserDept[] = [];
  病区列表:UserWard[] = [];
  角色列表:UserRole[] = [];
}

export class UserDept {
  用户ID:string;
  科室ID: string;
  科室名称: string;
  科室类别: string;
  医院编码: string;
}

export class UserWard {
  用户ID:string;
  科室ID:string;
  科室名称:string;
  科室类别:string;
  病区ID:string;
  病区名称:string;
  医院编码:string;
}

export class UserRole {
  用户ID:string;
  科室ID:string;
  科室名称:string;
  角色编码:string;
  角色名称:string;
  医院编码:string;
}
