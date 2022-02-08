const queries = {
  getAllIDUser: 'SELECT [id_usu_spoty] FROM [dbo].[mUsuario]',
  getIDSexo: 'SELECT [id_sex] FROM [dbo].[cSexo] WHERE sexo = @sexo ',
  getSexo: 'SELECT [sexo] FROM [dbo].[cSexo] WHERE id_sex = @id_sex ',
  getAllSexo: 'SELECT [sexo] FROM [dbo].[cSexo] ',
  getIDSemestre: 'SELECT [id_semestre] FROM [dbo].[cSemestre] WHERE semestre = @semestre',
  getSemestre: 'SELECT [semestre] FROM [dbo].[cSemestre] WHERE id_semestre = @id_semestre',
  getAllSemestre: 'SELECT [semestre] FROM [dbo].[cSemestre] ',
  getIDCarrera: 'SELECT [id_carr] FROM [dbo].[cCarrera] WHERE carrera = @carrera',
  getCarrera: 'SELECT [carrera] FROM [dbo].[cCarrera] WHERE id_carr = @id_carr',
  getAllCarrera: 'SELECT [carrera] FROM [dbo].[cCarrera] ',
  getIDImgPerf: 'SELECT [id_imgPerf] FROM [dbo].[cImgPerfil] WHERE id_img_drive = @id_img_drive',
  getImgPerfil: 'SELECT [id_img_drive] FROM [dbo].[cImgPerfil] WHERE id_imgPerf = @id_imgPerf',
  getAllImgPerfil: 'SELECT [id_img_drive] FROM [dbo].[cImgPerfil] ',

  insertIDPlaylist: 'INSERT INTO [dbo].[mPlaylist] ([id_playlist_spoty]) VALUES ( @id_playlist_spoty )',
  insertIDTrack: 'INSERT INTO [dbo].[mTrack] ([id_trac_spoty]) VALUES ( @id_trac_spoty )',
  deleteIDPlaylist: 'DELETE FROM [dbo].[mPlaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty ',
  deleteIDTrack: 'DELETE FROM [dbo].[mTrack] WHERE [id_trac_spoty] =  @id_trac_spoty ',
  getAllIDPlaylist: 'SELECT id_playlist_spoty FROM [dbo].[mPlaylist]',
  getAllIDTrack: 'SELECT id_trac_spoty FROM [dbo].[mTrack]',

  insertUser_IDPlay: 'INSERT INTO [dbo].[ePlaylist] ([id_usu_spoty],  [id_playlist_spoty]) VALUES (@id_usu_spoty, @id_playlist_spoty )',
  insertUser_IDTrack: 'INSERT INTO [dbo].[eTrack] ([id_usu_spoty], [id_trac_spoty]) VALUES (@id_usu_spoty, @id_trac_spoty )',
  deleteUser_IDPlay: 'DELETE FROM [dbo].[ePlaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty AND [id_usu_spoty] = @id_usu_spoty',
  deleteUser_IDTrack: 'DELETE FROM [dbo].[eTrack] WHERE [id_trac_spoty] =  @id_trac_spoty AND [id_usu_spoty] = @id_usu_spoty',
  getAllIDPlay_User: 'SELECT id_playlist_spoty FROM [dbo].[ePlaylist] WHERE [id_usu_spoty] = @id_usu_spoty',
  getAllIDTrack_User: 'SELECT id_trac_spoty FROM [dbo].[eTrack] WHERE [id_usu_spoty] = @id_usu_spoty',
  getAllUser_IDPlay: 'SELECT id_usu_spoty FROM [dbo].[ePlaylist] WHERE [id_playlist_spoty] =  @id_playlist_spoty',
  getAllUser_IDTrack: 'SELECT id_usu_spoty FROM [dbo].[eTrack] WHERE [id_trac_spoty] =  @id_trac_spoty',
  isInMTrack: 'SELECT id_trac_spoty FROM [dbo].[mTrack] WHERE id_trac_spoty = @id_trac_spoty ',



  getUserByID: 'SELECT * FROM [dbo].[mUsuario] WHERE id_usu_spoty = @id_usu_spoty',
  // UpdateUser1: 'UPDATE [dbo].[musuario]'+
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
  // UpdateUser: 'UPDATE [dbo].[musuario] SET @atribute = @new_value  WHERE [id_usu_spoty] = @id_usu_spoty'
  insertUser: 'INSERT INTO [dbo].[mUsuario] ([id_usu_spoty]' +
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
  user: 'F9bb1D97ñ',
  password: 'd3ccivo+#ForEv3r',
  server: 'sofo9.database.windows.net',
  database: 'MelodyFriend',
  port: 1433,
  options: {
    encrypt: true, // for azure
  }
}

module.exports.queries = queries;
module.exports.dbsettings = dbsettings;
