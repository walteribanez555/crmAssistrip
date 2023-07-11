

// "{'permissions': [{'area': 'Dashboard', 'area_permissions': ['read', 'update', 'delete']}] }"

export const updateRol = ( action : string, area : string, toAdd : boolean, permissions : string    ) : string => {

  let updatedPermissions = JSON.parse(permissions);


  const rols = toAdd ? addToRol(updatedPermissions, area , action) : deleteToRol(updatedPermissions, area , action);



  return JSON.stringify(rols);

}



const addToRol = ( permissions : any , area: string, action : string ) =>{

  const listPermissions= permissions;

  const permissionToUpdate = listPermissions.permissions.find((permission : any ) => permission.area === area);

  if(!permissionToUpdate){
    listPermissions.permissions.push({
        area,
        area_permissions : [
          action
        ]
      }
    );
  }else{
    const actionToAdd = permissionToUpdate.area_permissions.find( (option : string) => option === action);

    if(!actionToAdd){
      permissionToUpdate.area_permissions = [...permissionToUpdate.area_permissions, action];
    }
  }



  return  listPermissions;
}

const deleteToRol = ( permissions : any , area: string, action : string  ) => {

  const listPermissions= permissions;

  const permissionToUpdate = listPermissions.permissions.find((permission : any ) => { return permission.area === area});

  if(!permissionToUpdate){
    return listPermissions;
  }


  permissionToUpdate.area_permissions = permissionToUpdate.area_permissions.filter((option : string) => {  return option != action });


   listPermissions.permissions =listPermissions.permissions.filter( ( permission : any ) => {return  permission.area_permissions.length>0});


  return listPermissions;
}

