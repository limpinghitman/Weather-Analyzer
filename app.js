const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",function(req,res)
{

    res.sendFile(__dirname+"/index.html");
})

app.post("/Weather-Analyzer",function(req,res)
{

    const query = req.body.cityName;
    const appid = "c54eaccc106cfddd5c7c5597d74f9187";
    const unit = req.body.unit;

    var unit_url="standard";
    if(unit=="Celsius")
    {
        unit_url="metric";
    }
    else if(unit=="Fahrenheit")
    {
        unit_url="imperial";
    }

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit_url;

    console.log(req.body);

    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            // console.log(data);
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const iconCode=weatherData.weather[0].icon;
            const iconUrl="https://openweathermap.org/img/wn/"+iconCode+".png"

            res.write("<h1>City : "+query+"</h1>");
            res.write("<h3>Temperature currently: "+temp+"</h3>");
            res.write("<h3>Weather Description: "+desc+"</h3>");
            res.write("<img src="+iconUrl+">");

            res.send();


        })
    })
})
 
app.listen(5000,function()
{
    console.log("Server running on 3000");
}) 
