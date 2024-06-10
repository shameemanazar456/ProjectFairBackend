const projects = require('../model/projectSchema')

exports.addProject = async(req,res)=>{
    console.log('inside project controller');
    console.log(req.payload);

    const userId = req.payload
    /* console.log(req.file);
    console.log(req.body); */

    const projectImage = req.file.filename
    const {title, language, github, website, overview} = req.body
    console.log(title, language, github, website, overview);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Already Exist')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId:userId

            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(error){
        res.status(401).json(`Request Failed Due to ${error}`)
    }

}

exports.getAllProjectController = async (req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);
    try{

        const query = {
            language:{
                $regex:searchkey,$options:'i'//options: to remove case sensitivity
            }
        }
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch(error){
        res.status(401).json(`request failed due to ${error}`)
    }

}

exports.getProjectController = async(req,res)=>{
    try{
        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
    }
    catch(error){
        res.status(401).json(`request failed due to ${error}`)

    }

}

//to get project of particulr project

exports.getUserProject = async (req,res)=>{
    const userId = req.payload
    console.log(userId);
    try{

        const allUserProject = await projects.find({userId})
        console.log(allUserProject);
        res.status(200).json(allUserProject)
    }
    catch(error){
        res.status(401).json(`Requset failed due to ${error}`)
    }
}

exports.deleteProjectController = async(req,res)=>{
    console.log(req);
    const {id} =req.params
    try{
        const result = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    }
    catch(error){
        res.status(401).json(`request failed due to ${error}`)

    }

}

exports.updateProjectController = async(req,res)=>{
const {id} = req.params
const {title, language, github, website, overview, projectImage} = req.body
const uploadImage = req.file?req.file.filename:projectImage
console.log(uploadImage);
try{
    const existingProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadImage},{new:true})
    await existingProject.save()
    res.status(200).json(existingProject)

}
catch(error){
    res.status(401).json(`Request Failed due to ${error}`)
    
}
}