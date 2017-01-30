import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);
var Schema = mongoose.Schema;
var _ = require('lodash');
const ObjectId = mongoose.Schema.Types.ObjectId;
// import uniqueValidator from 'mongoose-unique-validator';
// import crypto from 'crypto';

// var UserSchema = new Schema({
//   username: {type: String, unique: true, required: true, uniqueCaseInsensitive: true},
//   lastLoginAt: Date,
//   registeredAt: Date,
//   FirstName: {type: String},
//   LastName: {type: String},
//   hashedPassword: String,
//   isActive: {type: Boolean, default: true},
//   salt: String,
//   role: { type: Schema.Types.ObjectId, ref: 'Role',  index: true }
// }, { timestamps: true });
function UnnestJson(obj,  label){
  var retVal = {};
  var isObject = obj !== null && typeof obj === 'object'
  if(isObject)
  {
    var local = {}
    for (var x in obj) {
      if (obj.hasOwnProperty(x)) {
  //   Object.keys(obj).forEach(function(x){
        var k = x;
        if(label!="")
          k = label+"."+ x;
        local = _.extend({},local, UnnestJson(obj[x], k))

      }
    }
    return _.merge({}, retVal, local)
  }
  else
  {
    var k = [label].join("")
    var x = {};
    x[k] = obj;
    return x;
  }
  return retVal;
}
var PersonSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: Date
});
var pa = {
        kitchens:       { type: Number, grouping: 'Property Details' },
        city:           { type: String, enum: ['Bangalore', 'Pune'], grouping: 'Property Address' },
        houseNo:        { type: String, formControl: 'InputField', grouping: 'Property Address' },
        buildingName:   { type: String, required:true, formControl: 'InputField', grouping: 'Property Address' },
        fullAddress:    { type: String, formControl: 'InputField', grouping: 'Property Address' },
        area:           { type: String, formControl: 'InputField', grouping: 'Property Address' },
        landmark:       { type: String, formControl: 'InputField', grouping: 'Property Address' },
        map:            { type: [Number], index: '2d' },
        formattedAddress : { type: String, formControl: 'InputField', grouping: 'Property Address' }
    };

var pd = {
        bedrooms:       { type: Number, required:true, grouping: 'Property Details' },
        balconies:      { type: Number, grouping: 'Property Details' },
        bathrooms:      { type: Number, grouping: 'Property Details' },
        utilityAreas:   { type: Number, grouping: 'Property Details' },
        areaInSqFt:     { type: Number, grouping: 'Property Details' },
        floorNo:        { type: Number, grouping: 'Property Details' },
        totalFloors:    { type: Number, grouping: 'Property Details' },
        allowedFor:     { type: [String], enum: ['Family', 'PG', 'Spinster', 'Bachelor'], grouping: 'Property Details' },
        parkingSlotNos: { type: [String],grouping: 'Property Details'},
        imageUrl:       { type: [String],grouping: 'Property Details'},
        imageThumbnailUrl:    { type: [String],grouping: 'Property Details'},
        availabilityFrom: { type: Date,grouping: 'Property Details' },
        isPopular:      { type: String, enum: ['Yes', 'No'],default:'Yes' }
}
var ed = {
          furnishing:             { type: String, enum: ['None', 'Semi', 'Full'] },
          twoWheelerParkings:     { type: Number },
          doorFacing:             { type: String, enum: ['East', 'West', 'North', 'South'] },
          waterSupply:            { type: String, enum: ['Bore-Well', 'Public Supply'] },
          petFriendly:            { type: String, enum: ['Yes', 'No'] },
          powerBackup:            { type: String, enum: ['Yes', 'No', 'Partial'] },
          ageOfBuilding:          { type: String, enum: ['Old', 'New', 'Brand New'] },
          vaastuCompliant:        { type: String, enum: ['Yes', 'No'] },
          studyRooms:             { type: Number },
          storeRooms:             { type: Number },
          noOfCarParkings:        { type: Number },
          parkingIsCovered:       { type: String, enum: ['Yes', 'No']},
          hall:                   { type: String, enum: ['Yes', 'No']},
        };

var _pd = JSON.parse(JSON.stringify(pd))
_pd.extraDetails = new Schema(ed)
var __pd = JSON.parse(JSON.stringify(pd))
__pd.extraDetails = ed
var schemaObj = {
  propertyAddress: pa,
  propertyDetails: __pd
}
// console.log(schemaObj)
var UserSchema = new Schema({
    createdBy:      { type: ObjectId, ref: 'Person' },
    propertyAddress: new Schema(pa,{ timestamps: true }),
    propertyDetails: new Schema(pd,{ timestamps: true }),
}, { timestamps: true });
/**
 * Virtuals
 */
// UserSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(() => {
//     return this._password;
//   });

// UserSchema.virtual('passwordConfirmation')
//   .get(function () {
//     return this._passwordConfirmation;
//   })
//   .set(function (value) {
//     this._passwordConfirmation = value;
//   });

/**
 * Validations
 */

// Validate empty password
// UserSchema
//   .path('hashedPassword')
//   .validate(function (hashedPassword) {
//     if (this._password || this._passwordConfirmation) {
//       if (this._password.length < 5) {
//         this.invalidate('password', 'Password must be at least 5 characters.');
//       }
//       if (this._password !== this._passwordConfirmation) {
//         this.invalidate('passwordConfirmation', 'Password verification mismatch.');
//       }
//     }

//     if (hashedPassword.length == 0) {
//       this.invalidate('password', 'Password can not be blank');
//     }
//   }, null);

/**
 * Methods
 */
// UserSchema.methods = {
//   /**
//    * Authenticate - check if the passwords are the same
//    *
//    * @param {String} plainText
//    * @return {Boolean}
//    * @api public
//    */
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashedPassword;
//   },

//   /**
//    * Make salt
//    *
//    * @return {String}
//    * @api public
//    */
//   makeSalt: function () {
//     return crypto.randomBytes(16).toString('base64');
//   },

//   /**
//    * Encrypt password
//    *
//    * @param {String} password
//    * @return {String}
//    * @api public
//    */
//   encryptPassword: function (password) {
//     if (!password || !this.salt) return '';
//     var salt = new Buffer(this.salt, 'base64');
//     return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
//   }
// };
var User = mongoose.model('User', UserSchema);
var Person = mongoose.model('Person', PersonSchema)
var jsonSchema = User.jsonSchema('','createdBy');
 
// console.log(JSON.stringify(jsonSchema));
// console.log(UserSchema.paths.propertyAddress.schema.paths.kitchens.options.grouping)
// Object.keys(UserSchema.paths).forEach((path)=>{if(UserSchema.paths[path])console.log((UserSchema.paths)[path])})
// UserSchema.plugin(uniqueValidator, {message: 'User already exist for the provided {PATH}.'});
// module.exports = mongoose.model('User', UserSchema);
function addGrouping(sourceObj, obj){
  var _sourceObj = sourceObj.properties;
  var keys = Object.keys(_sourceObj);
  keys.forEach((key)=>{
    if(_sourceObj[key].properties && !_sourceObj[key]['x-ref']){
      addGrouping(_sourceObj[key], obj)
    }
    else if(!_sourceObj[key]['x-ref']){
     (Object.keys(obj)).forEach((_key)=>{
      if(_key.match(new RegExp(key+'.grouping'))){
        _sourceObj[key]['grouping'] = obj[_key]
      }
     })
    }
  })
}
addGrouping(jsonSchema, UnnestJson(schemaObj,''))
console.log(JSON.stringify(jsonSchema));
