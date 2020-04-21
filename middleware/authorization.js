const DashboardLoader = (req,res,next)=>{


    if(req.session.userInfo.type=="Admin")
    {
        res.render("../views/dashboards/adminDashboard");
    }

    else{
        res.render("../views/dashboards/dashboard");
    }
}

module.exports = DashboardLoader;