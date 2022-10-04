const { ObjectId: ObjectId } = require('mongodb');

module.exports = [
  {
    _id: ObjectId(),
    "property_number": 15,
    "postcode": "CF10 1DD",
    "room_count": 6,
    "square_footage": 127,
    "area_value_factor": 0.5,
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
    "area_value_factor": 1.5,
    "refuse_collection_day": "Tuesday",
    "previous_valuation": 125000,
    "previous_valuation_date": new Date()
  },
  {
    _id: ObjectId(),
    "property_number": 15,
    "postcode": "CF10 1DD",
    "room_count": 6,
    "square_footage": 127,
    "area_value_factor": 1.3,
    "refuse_collection_day": "Monday"
  },
  {
    _id: ObjectId(),
    "property_number": 28,
    "postcode": "CF10 1DD",
    "room_count": 6,
    "square_footage": 127,
    "area_value_factor": 1.3,
    "refuse_collection_day": "Monday"
  }
];
