// import models
import Location from "../models/Location.js";
 
/*function create location
    sample parameter:

    {
        "name": "Stadion Mahanan",
        "city": "Solo",
        "country": "Indonesia",
        "lat": "-7.554983301188094",
        "long": "110.80657631534346",
      }

*/
export const saveLocation = async (req, res) => {

    const location = new Location(req.body);
    try {
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}