const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const profile ={
    name: "krP",
    avatar: "https://avatars.githubusercontent.com/u/80434144?v=4",
    "monthly-budget": 300,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [{
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
}]

function remainingDays(job){
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()
    const DayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs/DayInMs)

    return dayDiff
}

routes.get('/', (req, res)=>{    
    // budget: 4500,
    //remaining: 3,
    //status 'done'
    const updatedJobs = jobs.map((job) =>{
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        }
    })
    return res.render(views + "index", { jobs: updatedJobs })
})

routes.get('/job/edit', (req, res)=>{    
    return res.render(views + "job-edit")
})

routes.post('/job/edit', (req, res)=>{    
    return res.render(views + "job-edit")
})

routes.get('/job', (req, res)=>{    
    return res.render(views + "job")
})

routes.post('/job', (req, res)=>{    

    const lastId = jobs[jobs.length - 1]?.id || 1;
    jobs.push({
        id: lastId + 1,
        name:req.body.name,
        "daily-hours":req.body["daily-hours"],
        "total-hours":req.body["total-hours"],
        created_at: Date.now()
    })
    console.log(jobs)
    return res.redirect('/')
})

routes.get('/profile', (req, res)=>{    
    return res.render(views + "profile", {profile})
})

routes.get('/index', (req, res)=>{    
    return res.redirect("/")
})

module.exports = routes;