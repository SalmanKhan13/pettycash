const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  totalbills: {
    type: Number
  },
  currentbalance: {
    type: Number
  },
  allocatedbalance: {
    type: Number
  },

  remainingbalance: {
    type: Number
  },
  totalbalance: {
    type: Number
  },
  onlineservices: [
    {
      date: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      onlinecategory: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }
  ],
  logistics: [
    {
      date: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      logisticscategory: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }
  ],
  travelling: [
    {
      date: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      travellingcategory: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
