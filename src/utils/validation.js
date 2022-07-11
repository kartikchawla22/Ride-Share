var constraints = {
    name: {
        presence: true,
        format: {
            pattern: /^[a-zA-Z ,.'-]+$/i,
            message: '^Invalid name',
        }
    },
    email: {
        presence: true,
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '^Invalid email id',
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 4,
            message: '^Password must be at least 4 character long',
        }
    },
    confirmPassword: {
        presence: true,
        equality: 'password'
    },
    vehicleNumber: {
        presence: true
    },
    leavingFrom: {
        presence: true
    },
    goingTo: {
        presence: true
    },
    dateOfTravel: {
        presence: true
    },
    numberOfPassengersAllowed: {
        presence: true
    },
    leavinpricePerRidergFrom: {
        presence: true
    },
    pricePerRider: {
        presence: true
    }
};



export default constraints
