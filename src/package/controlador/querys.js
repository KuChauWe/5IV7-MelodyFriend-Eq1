const queries = {
  getAllIDUser: 'SELECT [id_usu_spoty] FROM [bd_melodyfriend].[mUsuario]',
  getIDSexo: 'SELECT [id_sex] FROM [bd_melodyfriend].[csexo] WHERE sexo = @sexo ',
  getSexo: 'SELECT [sexo] FROM [bd_melodyfriend].[csexo] WHERE id_sex = @id_sex ',
  getAllSexo: 'SELECT [sexo] FROM [bd_melodyfriend].[csexo] ',
  getIDSemestre: 'SELECT [id_semestre] FROM [bd_melodyfriend].[cSemestre] WHERE semestre = @semestre',
  getSemestre: 'SELECT [semestre] FROM [bd_melodyfriend].[cSemestre] WHERE id_semestre = @id_semestre',
  getAllSemestre: 'SELECT [semestre] FROM [bd_melodyfriend].[cSemestre] ',
  getIDCarrera: 'SELECT [id_carr] FROM [bd_melodyfriend].[cCarrera] WHERE carrera = @carrera',
  getCarrera: 'SELECT [carrera] FROM [bd_melodyfriend].[cCarrera] WHERE id_carr = @id_carr',
  getAllCarrera: 'SELECT [carrera] FROM [bd_melodyfriend].[cCarrera] ',
  getIDImgPerf: 'SELECT [id_imgPerf] FROM [bd_melodyfriend].[cImgPerfil] WHERE id_img_drive = @id_img_drive',
  getImgPerfil: 'SELECT [id_img_drive] FROM [bd_melodyfriend].[cImgPerfil] WHERE id_imgPerf = @id_imgPerf',
  getAllImgPerfil: 'SELECT [id_img_drive] FROM [bd_melodyfriend].[cImgPerfil] ',

  insertIDPlaylist: 'INSERT INTO [bd_melodyfriend].[mplaylist] ([id_playlist_spoty]) VALUES ( @id_playlist_spoty )',
  insertIDTrack: 'INSERT INTO [bd_melodyfriend].[mtrack] ([id_trac_spoty]) VALUES ( @id_trac_spoty )',
  deleteIDPlaylist: 'DELETE FROM [bd_melodyfriend].[mplaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty ',
  deleteIDTrack: 'DELETE FROM [bd_melodyfriend].[mtrack] WHERE [id_trac_spoty] =  @id_trac_spoty ',
  getAllIDPlaylist: 'SELECT id_playlist_spoty FROM [bd_melodyfriend].[mplaylist]',
  getAllIDTrack: 'SELECT id_trac_spoty FROM [bd_melodyfriend].[mtrack]',

  insertUser_IDPlay: 'INSERT INTO [bd_melodyfriend].[eplaylist] ([id_usu_spoty],  [id_playlist_spoty]) VALUES (@id_usu_spoty, @id_playlist_spoty )',
  insertUser_IDTrack: 'INSERT INTO [bd_melodyfriend].[etrack] ([id_usu_spoty], [id_trac_spoty]) VALUES (@id_usu_spoty, @id_trac_spoty )',
  deleteUser_IDPlay: 'DELETE FROM [bd_melodyfriend].[eplaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty AND [id_usu_spoty] = @id_usu_spoty',
  deleteUser_IDTrack: 'DELETE FROM [bd_melodyfriend].[etrack] WHERE [id_trac_spoty] =  @id_trac_spoty AND [id_usu_spoty] = @id_usu_spoty',
  getAllIDPlay_User: 'SELECT id_playlist_spoty FROM [bd_melodyfriend].[eplaylist] WHERE [id_usu_spoty] = @id_usu_spoty',
  getAllIDTrack_User: 'SELECT id_trac_spoty FROM [bd_melodyfriend].[etrack] WHERE [id_usu_spoty] = @id_usu_spoty',
  getAllUser_IDPlay: 'SELECT id_usu_spoty FROM [bd_melodyfriend].[eplaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty',
  getAllUser_IDTrack: 'SELECT id_usu_spoty FROM [bd_melodyfriend].[etrack] WHERE [id_trac_spoty] =  @id_trac_spoty',
  isInMTrack: 'SELECT id_trac_spoty FROM [bd_melodyfriend].[mtrack] WHERE id_trac_spoty = @id_trac_spoty ',



  getUserByID: 'SELECT * FROM [bd_melodyfriend].[mUsuario] WHERE id_usu_spoty = @id_usu_spoty',
  // UpdateUser1: 'UPDATE [bd_melodyfriend].[musuario]'+
  //             'SET [nickname_usu_spoti] = @nickname_usu_spoti'+
  //             ',[name_usu] = @name_usu'+
  //             ',[fcNaci_usu] = @fcNaci_usu'+
  //             ',[desc_usu] = @desc_usu'+
  //             ',[id_sex] = @id_sex'+
  //             ',[id_carr] = @id_carr'+
  //             ',[id_semestre] = @id_semestre'+
  //             ',[id_imgPerf] = @id_imgPerf'+
  //             ',[facebook] = @facebook'+
  //             ',[twitter] = @twitter'+
  //             ',[instagram] = @instagram'+
  //             ' WHERE [id_usu_spoty] = @id_usu_spoty',
  // UpdateUser: 'UPDATE [bd_melodyfriend].[musuario] SET @atribute = @new_value  WHERE [id_usu_spoty] = @id_usu_spoty'
  insertUser: 'INSERT INTO [bd_melodyfriend].[musuario] ([id_usu_spoty]' +
    ' ,[nickname_usu_spoti]' +
    ' ,[name_usu]' +
    '  ,[fcNaci_usu]' +
    ' ,[desc_usu]' +
    "  ,[id_sex]" +
    ' ,[id_carr]' +
    ' ,[id_semestre]' +
    ',[id_imgPerf]' +
    '  ,[facebook]' +
    '    ,[twitter]' +
    ' ,[instagram])' +
    'VALUES' +
    ' (@id_usu_spoty' +
    '  ,@nickname_usu_spoti' +
    ' ,@name_usu' +
    '  ,@fcNaci_usu' +
    ' ,@desc_usu' +
    '   ,@id_sex' +
    '   ,@id_carr' +
    ' ,@id_semestre' +
    ' ,@id_imgPerf' +
    '   ,@facebook' +
    ',@twitter' +
    ' ,@instagram)'

}

const dbsettings = {
  user: 'fabbidatUserPro',
  password: 'd3ccivo+#ForEv3r',
  server: 'melodyfriendserver.database.windows.net',
  database: 'bd-MelodyFriend-Deployed',
  port: 1433,
  options: {
    encrypt: true, // for azure
  }
}

module.exports.queries = queries;
module.exports.dbsettings = dbsettings;
