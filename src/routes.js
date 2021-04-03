const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const Job = {
    data: [
        {
            id: 1,
            name: "Project Name",
            "daily-hours": 2,
            "total-hours": 40,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "Second Project Name",
            "daily-hours": 5,
            "total-hours": 49,
            created_at: Date.now()
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) =>{
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"],
                    avatar: Profile.data.avatar
                }
            })
            
            return res.render(views + "index", { jobs: updatedJobs })
        },
        save(req, res){
            const lastId = Job.data[Job.data.length - 1]?.id || 1;
            Job.data.push({
                id: lastId + 1,
                name:req.body.name,
                "daily-hours":req.body["daily-hours"],
                "total-hours":req.body["total-hours"],
                created_at: Date.now()
            })
            console.log(Job.data)
            return res.redirect('/')
         },
        create(req, res){
            return res.render(views + "job")
        }
        },
    services: {
        remainingDays(job){
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            const DayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs/DayInMs)
        
            return dayDiff
        }
    }
}

const Profile ={
    data: {
        name: "krP",
        avatar: "https://github.com/ImaKrp.png",
        "monthly-budget": 300,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },   
    controllers: {
        index(req, res) {
            return res.render(views + "profile", {profile: Profile.data})
        },

        update(req, res) {
            const data = req.body
            const weeksPerYears = 52
            const weeksPerMonth = (weeksPerYears - data["vacation-per-year"])/ 12
            const weekTotalHours = data["days-per-week"] * data["hours-per-day"]
            const MonthlyTotalHours = weeksPerMonth * weekTotalHours

            const valueHour= data["monthly-budget"] / MonthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            return res.redirect('/profile')
        },
    },
}

routes.get('/', Job.controllers.index)

routes.get('/index', Job.controllers.index)

routes.get('/job/edit', (req, res)=>{    
    return res.render(views + "job-edit")
})

routes.post('/job/edit', (req, res)=>{    
    return res.render(views + "job-edit")
})

routes.get('/job', Job.controllers.create)

routes.post('/job', Job.controllers.save)

routes.get('/profile', Profile.controllers.index)

routes.post('/profile', Profile.controllers.update)

module.exports = routes;