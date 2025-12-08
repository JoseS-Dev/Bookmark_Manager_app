// Función para seleccionar todos los campos de una tabla , pero sin incluir created_at y updated_at
export function selectAllWithoutTimestamps(tableName: any){
    const fields: { [key: string]: boolean } = {}
    Object.keys(tableName.fields).forEach(field => {
        if(field !== 'created_at' && field !== 'updated_at'){
            fields[field] = true
        }
    })
    return fields
}