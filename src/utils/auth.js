/**
* 权限认证
*/

export default function(permission) {
  let hasPermissions = localStorage.getItem('has_permissions');
  if(hasPermissions != null && hasPermissions != "") {
    let permissionArr = hasPermissions.split(',');
    let index = -1;
    for (let i = 0; i < permissionArr.length; i++) {
      if(permissionArr[i] === permission) {
        index = i;
        break;
      }
    }
    if(index === -1) {
      return false;
    } else {
      return true;
    }
  }
}
