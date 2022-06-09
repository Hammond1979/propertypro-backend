import Model from '../../models/model';
const propertyModel = new Model('properties');
export const createProperty = async (req, res) => {
  const {id} = req.user.user
  const {
    image, title, address, city, landArea, noOfBath, noOfBed, landSize
  } = req.body;
  const columns = 'agent_id, image_url, title, address, city, land_area, no_of_baths, no_of_beds, land_size';
  const values = `'${id}', '${image}', '${title}', '${address}', '${city}', '${landArea}', '${noOfBath}', '${noOfBed}', '${landSize}'`;
  try {
    const data = await propertyModel.insertWithReturn(columns, values)
    return res.status(201).json(data.rows);
  } catch (err) {
    res.status(500).json({ messages:err });
  }
};

export const allProperties = async (req, res) => {
  try {
    const getProperties = await propertyModel.select('*');
    if (getProperties.rows === 0) {
      res.status(200).json('no property');
    }
    res.status(200).json(getProperties.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ messages: err });
  }
};
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const getProperty = await propertyModel.select('*', ` WHERE  id = '${id}' `);
    if (getProperty.rows === 0) {
      res.status(200).json('no property');
    }
    res.status(200).json(getProperty.rows);
  } catch (err) {
    res.status(500).json({ messages: err });
  }
};
export const editProperty = async (req, res, next) => {
  const { userId } = req.params;
  const agentId = req.user.user.id;
  try {
    const data = await propertyModel.update(req.body, ` WHERE "id" = ${userId} AND "agent_id" = ${agentId} `);
    return res.status(201).json({ message: 'user property is edited successfully', success: true });
  } catch (err) {
    res.status(500).json({ messages: err });
  }
  next();
};
export const deleteProperty = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  const agentId = req.user.user.id;
  // console.log( `${agentId} ${userId}` )
  try {
    const data = await propertyModel.delete(` WHERE  id = '${userId}' AND agent_id = ${agentId} `);
      res.status(200).json({message: 'Property is deleted successfully'});
  } catch (err) {
    res.status(500).json({ messages: err });
  }
};
export const agentProperties = async (req, res) => {
  const userId = req.params.id;
  try {
    const getProperties = await propertyModel.select('*', ` WHERE agent_id = ${userId} `);
    return res.status(200).json(getProperties.rows);
  } catch (err) {
    res.status(500).json({ messages: err });
  }
};





 