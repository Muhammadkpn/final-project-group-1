const database = require("../database")
const {asyncQuery} = require("../helper/queryHelper")

module.exports={
    getAddress: async(req,res)=>{
        try {
            console.log('test')
            const getAddress = `SELECT ua.id, ua.user_id, ua.address, ua.city, ua.province, ua.postcode, ua.latitude, ua.longitude, a.type FROM user_address ua
            LEFT JOIN address_type a on ua.address_type_id = a.id`
            const result = await asyncQuery(getAddress)
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getAddressByID: async(req,res)=>{
        const Id = parseInt(req.params.id)
        try {
            console.log('test')
            const getAddress = `SELECT ua.id, ua.user_id, ua.address, ua.city, ua.province, ua.postcode, ua.latitude, ua.longitude, a.type FROM user_address ua
            LEFT JOIN address_type a on ua.address_type_id = a.id
            WHERE ua.user_id = ${database.escape(Id)}`
            const result = await asyncQuery(getAddress)
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    editAddress: async(req,res)=>{
        const Id = parseInt(req.params.id)
        try {
             // check user id
             const checkId = `SELECT * FROM user_address WHERE id = ${database.escape(Id)}`
             const resultId = await asyncQuery(checkId)
 
             if(resultId.length === 0){
                 return res.status(400).send(`Users with id : ${Id} doesn\'t exists`)
             }
 
             const edit = `UPDATE user_address SET ${generateQuery(req.body)}
                         WHERE id = ${database.escape(Id)}`
             const result = await asyncQuery(edit)
             res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    deleteAddress: async(req,res)=>{
        const Id = parseInt(req.params.id)
        try {
            const del = `DELETE FROM user_address WHERE id = ${database.escape(Id)}`
            const result = await asyncQuery(del)
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}