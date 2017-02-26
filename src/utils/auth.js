/**
* 权限认证
*/

export default function(permission) {
  let hasPermissions = localStorage.getItem('has_permissions');
  if(hasPermissions != null && hasPermissions != "") {
    let permissionArr = hasPermissions.split(',');
    let isAuth = permissionArr.findIndex(function(value, index, arr) {
      return value === permission;
    });
    if(isAuth === -1) {
      return false;
    } else {
      return true;
    }
  }
}
