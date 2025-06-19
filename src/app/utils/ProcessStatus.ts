export class ProcessStatus {

    public static 全部 ='ALL';
    public static 未提交 ='WTJ';
    public static 医生提交 ='YSTJ';
    public static 科主任提交 ='KZRTJ';
    public static 质控科提交 ='ZKKTJ';
    public static 归档 ='GD';
    public static 上架 ='BASJ';
    public static 科主任退回 ='KZRTH';
    public static 质控科退回 ='ZKKTH';
    public static 未归档 ='WGD';
    public static 病案退回 = 'GDTH';
    public static 简化流程可提交状态 = ProcessStatus.未提交 + ',TH';
    private static options = {
            "医生提交": [ProcessStatus.未提交,ProcessStatus.科主任退回],
            "病案归档": [ProcessStatus.未提交,ProcessStatus.医生提交,ProcessStatus.科主任提交,ProcessStatus.归档,ProcessStatus.质控科提交,ProcessStatus.上架],
            "院级质控": [ProcessStatus.归档,ProcessStatus.质控科提交],
            "科级质控": [ProcessStatus.医生提交,ProcessStatus.科主任提交],
        }
    public static getStatuOptions(data,type){
        let statusList = data['质控状态列表'] || [];
        let _statusMap = statusList.reduce((p,c) => {
            p[c['code']] = c['value'];
            return p;
        },{});
    if (type == '病历书写') {
        return [{ "label": _statusMap[this.未提交], "value": this.未提交 }, { "label": "驳回", "value": "TH" }];
    }
    let status = this.options[type] || [];
    return status.reduce((p, c) => {
        p.push({ 'label': _statusMap[c], 'value': c });
        return p;
    }, []);
}
public static getSimpleStatusOption(data,type){
    let statusList = data['质控状态列表'] || [];
        let _statusMap = statusList.reduce((p,c) => {
            p[c['code']] = c['value'];
            return p;
        },{});
    
    let status = this.options["SIMPLE"][type] || [];
    return status.reduce((p, c) => {
        p.push({ 'label': _statusMap[c], 'value': c });
        return p;
    }, []);
}

public static statusMap(data,isNewPro,status){
    let statusList = data['质控状态列表'] || [];
        let _statusMap = statusList.reduce((p,c) => {
            p[c['code']] = c['value'];
            return p;
        },{});
        return _statusMap[status] || '';
}
}

