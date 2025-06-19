export class CurrentUserInfo {
  areaCode:string;
  userId:string;
  userName:string;

  hosNum:string;
  nodeCode:string;
  hosName: string;

  currentDeptId:string;
  currentDeptName: string;
  currentDeptType: string;

  currentWardId:string;
  currentWardName: string;

  currentRoles:string[] = [];
  currentRole:string; // 标识管理员类型(adminweb使用): '用户', '医院', '区域'
  currentMenus:string[] = [];
  authority:string;
  userType:number;//用户类型 1、门诊 2、住院 3、急诊 
  userTypeCH:string;
  职称编码:string;
}
