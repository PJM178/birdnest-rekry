const axios = require('axios');
const { XMLParser, XMLValidator} = require('fast-xml-parser');

const dronesRouter = require('express').Router();

dronesRouter.get('/', async (request, response) => {
  const drones = await axios.get('http://assignments.reaktor.com/birdnest/drones');
  // Validate the form of the XML data
  const validatedDrones = XMLValidator.validate(drones.data);
  // If true, parse the data to json format and return it
  if (validatedDrones === true) {
    const dronesJson = new XMLParser().parse(drones.data);
    response.status(200).json(dronesJson);
  // If false, return error along with relevant status
  } else if (validatedDrones.err) {
    const error = validatedDrones.err.msg;
    console.log(`XML is invalid: ${error}`);
    response.status(500).json(`XML is invalid: ${error}`);
  }
});

module.exports = dronesRouter;