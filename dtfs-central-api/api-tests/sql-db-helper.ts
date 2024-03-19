import { AzureFileInfoEntity, UtilisationDataEntity, UtilisationReportEntity } from '@ukef/dtfs2-common';
import { SqlDbDataSource } from '@ukef/dtfs2-common/sql-db-connection';

const initialize = async () => await SqlDbDataSource.initialize();

type SqlTableName = 'UtilisationReport' | 'UtilisationData' | 'AzureFileInfo';

const deleteAllEntries = async (tableName: SqlTableName): Promise<void> => {
  switch (tableName) {
    case 'UtilisationReport':
      await SqlDbDataSource.manager.delete(UtilisationReportEntity, {});
      return;
    case 'UtilisationData':
      await SqlDbDataSource.manager.delete(UtilisationDataEntity, {});
      return;
    case 'AzureFileInfo':
      await SqlDbDataSource.manager.delete(AzureFileInfoEntity, {});
      return;
    default:
      throw new Error(`Cannot delete all entries from table: no entity found for table name '${tableName}'`);
  }
};

type Entity<TableName extends SqlTableName> = TableName extends 'UtilisationReport'
  ? UtilisationReportEntity
  : TableName extends 'UtilisationData'
  ? UtilisationDataEntity
  : TableName extends 'AzureFileInfo'
  ? AzureFileInfoEntity
  : never;

const saveNewEntry = async <TableName extends SqlTableName>(tableName: TableName, entityToInsert: Entity<TableName>): Promise<Entity<TableName>> => {
  switch (tableName) {
    case 'UtilisationReport':
      return await SqlDbDataSource.manager.save(UtilisationReportEntity, entityToInsert);
    case 'UtilisationData':
      return await SqlDbDataSource.manager.save(UtilisationDataEntity, entityToInsert);
    case 'AzureFileInfo':
      return await SqlDbDataSource.manager.save(AzureFileInfoEntity, entityToInsert);
    default:
      throw new Error(`Cannot save new entry to table: no entity found for table name '${tableName}'`);
  }
};

const saveNewEntries = async <TableName extends SqlTableName>(tableName: TableName, entityToInsert: Entity<TableName>[]): Promise<Entity<TableName>[]> => {
  switch (tableName) {
    case 'UtilisationReport':
      return await SqlDbDataSource.manager.save(UtilisationReportEntity, entityToInsert);
    case 'UtilisationData':
      return await SqlDbDataSource.manager.save(UtilisationDataEntity, entityToInsert);
    case 'AzureFileInfo':
      return await SqlDbDataSource.manager.save(AzureFileInfoEntity, entityToInsert);
    default:
      throw new Error(`Cannot save entries to table: no entity found for table name '${tableName}'`);
  }
};

export const SqlDbHelper = {
  initialize,
  deleteAllEntries,
  saveNewEntry,
  saveNewEntries,
};
