const { ObjectID: ObjectId } = require('mongodb');

module.exports = [
  {
    _id: ObjectId(),
    "property_number": 15,
    "postcode": "CF10 1DD",
    "room_count": 6,
    "square_footage": 127,
    "inflation_factor": 1.3,
    "refuse_collection_day": "Monday",
    "previous_valuation": 125000,
    "previous_valuation_date": new Date()
  },
  {
    _id: ObjectId(),
    "property_number": 34,
    "postcode": "CF10 1DD",
    "room_count": 8,
    "square_footage": 567,
    "inflation_factor": 1,
    "refuse_collection_day": "Tuesday"
  },
  {
    _id: ObjectId(),
    "property_number": 15,
    "postcode": "CF10 1DD",
    "room_count": 6,
    "square_footage": 127,
    "inflation_factor": 1.3,
    "refuse_collection_day": "Monday"
  }
];
