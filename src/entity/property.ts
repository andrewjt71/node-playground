import { ObjectId } from "mongodb";

export default interface Property {
    property_number: number;
    postcode: string;
    room_count: number;
    square_footage: number;
    area_value_factor: number;
    refuse_collection_day: string;
    previous_valuation: number;
    previous_valuation_date: Date;
    _id: ObjectId
}
