const { ObjectId } = require('mongodb');
const OrdenModel = require('./../models/carshop/orden');

const actualizarEstadoOrden = async (req,res) =>{
    try{
        const ordenId = req.params.id;
        const data = req.body;
        const validar=false;
        if(data.estado === "Servicio En Proceso"){
            validar=true;
        }else if(data.estado === "Servicio Terminado"){
            validar=true;
        }else{
            return res.status(404).json({error: "Parametros de estado de orden no permitidos"});
        }
        const editarOrden = await OrdenModel.updateOne({
            _id: new ObjectId(ordenId)
        },{
            estado: data.estado
        })

        return res.status(200).json({message: "Orden actualizada con exito", data: editarOrden});
    

    }catch(err){
        return res.status(500).json({error: "Error al actualizar el estado de la orden"});
    }
}

module.exports = actualizarEstadoOrden;