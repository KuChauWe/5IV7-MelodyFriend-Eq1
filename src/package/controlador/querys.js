export const queries = {
    getIDSexo: 'SELECT [id_sex] FROM [bd_melodyfriend].[csexo] WHERE sexo = @sexo ',
    getSexo:'SELECT [sexo] FROM [bd_melodyfriend].[csexo] WHERE id_sex = @id_sex ',
    getIDSemestre: 'SELECT [id_semestre] FROM [bd_melodyfriend].[cSemestre] WHERE semestre = @semestre',
    getSemestre: 'SELECT [semestre] FROM [bd_melodyfriend].[cSemestre] WHERE id_semestre = @id_semestre',
    getIDCarrera: 'SELECT [id_carr] FROM [bd_melodyfriend].[cCarrera] WHERE carrera = @carrera',
    getCarrera: 'SELECT [carrera] FROM [bd_melodyfriend].[cCarrera] WHERE id_carr = @id_carr',
    getIDImgPerf: 'SELECT [id_imgPerf] FROM [bd_melodyfriend].[cImgPerfil] WHERE id_img_drive = @id_img_drive',
    getImgPerfil: 'SELECT [id_img_drive] FROM [bd_melodyfriend].[cImgPerfil] WHERE id_imgPerf = @id_imgPerf',
    getUserByID: 'SELECT * FROM [bd_melodyfriend].[mUsuario] WHERE id_usu_spoty = @id_usu_spoty', 
    UpdateUser: 'UPDATE [bd_melodyfriend].[musuario]'+
                'SET [nickname_usu_spoti] = @nickname_usu_spoti'+
                ',[name_usu] = @name_usu'+
                ',[fcNaci_usu] = @fcNaci_usu'+
                ',[desc_usu] = @desc_usu'+
                ',[id_sex] = @id_sex'+
                ',[id_carr] = @id_carr'+
                ',[id_semestre] = @id_semestre'+
                ',[id_imgPerf] = @id_imgPerf'+
                ',[facebook] = @facebook'+
                ',[twitter] = @twitter'+
                ',[instagram] = @instagram'+
                ' WHERE [id_usu_spoty] = @id_usu_spoty'

}