let data = {
    name: "krP",
    avatar: "https://github.com/ImaKrp.png",
    "monthly-budget": 300,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

module.exports = {
    get(){
        return data
    },
    update(newData){
        data = newData
    }
}