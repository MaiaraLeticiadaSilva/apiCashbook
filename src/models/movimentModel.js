const mysql = require("./mysqlConnect");

get= async (query)=>{
    sql=`SELECT value, type, date FROM moviment`
    return await  mysql.query(sql);
}

IOFilter = async (year,month)=>{
    let date = new Date(`${year}-${month}`).toISOString().slice(0, 19).replace('T', ' ').split(" ");
    sql=`SELECT * FROM moviment WHERE date = '${date[0]}'`
    return await mysql.query(sql);
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

put= async (date, idUser)=>{
    sql="UPDATE moviments SET "
    +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
    +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }
module.exports= {get,post, put, remove, IOFilter}