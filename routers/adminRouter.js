const express = require('express')
const router = express.Router()
const authenticateUser = require('../middlewares/authenticateUser')
const allowRoles = require('../middlewares/allowRoles')
const Skill = require('../models/SkillsModel')
const certification = require('../models/CertificationModel')
const works = require('../models/ProjectModel')
const upload = require('../middlewares/multerConfig');
const Education = require('../models/EducationModel')
const Experience = require('../models/ExperienceModel')

router.post('/addSkill', authenticateUser, allowRoles('admin'), upload.single('file'), async (req, res) => {
    const { skill, level } = req.body
    try {
        if (!skill || !level) {
            return res.status(404).json({ message: "All feilds required" })
        }
        const newSkill = await Skill.create({
            skill, level, file: [
                {
                    fileName: req.file.filename,
                    path: req.file.path
                }
            ]
        })

        res.status(200).json({
            message: "New Skill Added Successfully",
            file: req.file,
            newSkill: newSkill
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/deleteSkill/:id', authenticateUser, allowRoles('admin'), async (req, res) => {
    try {
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
        if (!deletedSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json({ message: "Skill deleted successfully", deletedSkill });
    } catch (error) {
        res.status(500).json({ message: "Error deleting skill", error });
    }
})

router.get('/allSkills', async (req, res) => {
    try {
        const allskills = await Skill.find();
        res.status(200).json({ message: "all skills fetched successfully", allskills: allskills })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/addProject', authenticateUser, allowRoles('admin'), upload.single('file'), async (req, res) => {
    const { name, category, link, description } = req.body
    try {
        if (!category || !name || !link || !description) {
            return res.status(404).json({ message: "All feilds required" })
        }

        const newProject = await works.create({
            name, category, link, description, file: [
                {
                    fileName: req.file.filename,
                    path: req.file.path
                }
            ]
        })

        res.status(200).json({
            message: "New Project Added Successfully",
            file: req.file,
            newProject: newProject
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/allProjects', async (req, res) => {
    try {
        const allprojects = await works.find();
        res.status(200).json({ message: "all projects fetched successfully", allprojects: allprojects })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/deleteProject/:id', authenticateUser, allowRoles('admin'), async (req, res) => {
    try {
        const deletedProject = await works.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully", deletedProject });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
});


router.post('/addCertification', authenticateUser, allowRoles('admin'), upload.none(), async (req, res) => {
    const { title, provider, link } = req.body
    try {
        if (!title || !provider || !link) {
            return res.status(404).json({ message: "All feilds required" })
        }

        const newCertification = await certification.create({ title, provider, link })

        res.status(200).json({
            message: "New Certification Added Successfully",
            newCertification: newCertification
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.delete('/deleteCertification/:id', authenticateUser, allowRoles('admin'), async (req, res) => {
    try {
        const deletedCertification = await certification.findByIdAndDelete(req.params.id);
        if (!deletedCertification) {
            return res.status(404).json({ message: "Certification not found" });
        }
        res.status(200).json({ message: "Certification deleted successfully", deletedCertification });
    } catch (error) {
        res.status(500).json({ message: "Error deleting certification", error });
    }
});


router.get('/allCertifications', async (req, res) => {
    try {
        const allcertifications = await certification.find();
        res.status(200).json({ message: "all skills fetched successfully", allcertifications: allcertifications })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/addEducation', authenticateUser, allowRoles('admin'), upload.none(), async (req, res) => {
    const { date, ins, role } = req.body
    try {
        if (!date || !ins || !role) {
            return res.status(404).json({ message: "All feilds required" })
        }

        const newEducation = await Education.create({ date, ins, role })

        res.status(200).json({
            message: "New Education Added Successfully",
            newEducation: newEducation
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.get('/allEducations', async (req, res) => {
    try {
        const alleducations = await Education.find();
        res.status(200).json({ message: "all Educations fetched successfully", alleducations: alleducations })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/deleteEducation/:id', authenticateUser, allowRoles('admin'), async (req, res) => {
    try {
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);
        if (!deletedEducation) {
            return res.status(404).json({ message: "Education not found" });
        }
        res.status(200).json({ message: "Education deleted successfully", deletedEducation });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Education", error });
    }
});

router.post('/addExperience', authenticateUser, allowRoles('admin'), upload.none(), async (req, res) => {
    const { date, ins, role } = req.body
    try {
        if (!date || !ins || !role) {
            return res.status(404).json({ message: "All feilds required" })
        }

        const newExperience = await Experience.create({ date, ins, role })

        res.status(200).json({
            message: "New Experience Added Successfully",
            newExperience: newExperience
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/allExperiences', async (req, res) => {
    try {
        const allexperiences = await Experience.find();
        res.status(200).json({ message: "all Experiences fetched successfully", allexperiences: allexperiences })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/deleteExperience/:id', authenticateUser, allowRoles('admin'), async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        res.status(200).json({ message: "Experience deleted successfully", deletedExperience });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Experience", error });
    }
});

router.get("/auth/checkAuth", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ loggedIn: true, user: decoded });
    } catch (err) {
        return res.json({ loggedIn: false });
    }
});

module.exports = router;