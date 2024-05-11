const express = require("express");
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./mongodbschema");
const multer = require('multer');
const app = express();
const templatePath = path.join(__dirname, '../templates/views');


app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath);



const mongoURI = 'mongodb://localhost:27017/Example';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


 
    

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/sign", (req, res) => {
    res.render("sign");
});

app.get("/update", (req, res) => {
    res.render("update");
});

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});





app.get("/admin", async (req, res) => {
    try {
        const users = await User.find();
        res.render("admin", { users });
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).send("Error while fetching users");
    }
});



const upload = multer({ dest: 'uploads/' });
app.post("/sign", upload.single('image') ,async (req, res) => {
    try {
        const { name, email, password, roll, section, branch, phone, localAddress, fatherName, motherName, fatherOccupation, motherOccupation, fatherPhoneNo, motherPhoneNo, fatherMailId, motherMailId, parentAddress,date, class10Percentage, class12Percentage, MENTORING, information} = req.body;
        const image = req.file ? req.file.filename : null;
        const newUser = new User({
            Timestamp: req.body.Timestamp,
            name,
            email,
            password,
            roll,
            section,
            branch,
            phone,
            localAddress,
            fatherName,
            motherName,
            fatherOccupation,
            motherOccupation,
            fatherPhoneNo,
            motherPhoneNo,
            fatherMailId,
            motherMailId,
            parentAddress,
            date,
            class10Percentage,
            class12Percentage,
            MENTORING,
            information: information !== undefined,
            image
        });

        await newUser.save();

        res.render("login", { success: "User created successfully. Please login." });
    } catch (error) {
        console.error('Error while saving user:', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(401).send("Email already exists");
        }
        res.status(401).send("Error while saving user");
    }
});





app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).render("login", { error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).render("login", { error: "Incorrect password" });
        }

        res.redirect("/admin");
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(401).send("Error while logging in");
    }
});



app.get("/admin", async (req, res) => {
    try {
        const users = await User.find();
        res.render("admin", { users, updateLink: `update`});
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).send("Error while fetching users");
    }
});

app.post("/update", async (req, res) => {
    try {
        const { email, name, roll, section, branch, phone, localAddress, fatherName, motherName, fatherOccupation, motherOccupation, fatherPhoneNo, motherPhoneNo, fatherMailId, motherMailId, parentAddress, date, class10Percentage, class12Percentage, MENTORING } = req.body;

        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        
        user.name = name;
        user.roll = roll;
        user.section = section;
        user.branch = branch;
        user.phone = phone;
        user.localAddress = localAddress;
        user.fatherName = fatherName;
        user.motherName = motherName;
        user.fatherOccupation = fatherOccupation;
        user.motherOccupation = motherOccupation;
        user.fatherPhoneNo = fatherPhoneNo;
        user.motherPhoneNo = motherPhoneNo;
        user.fatherMailId = fatherMailId;
        user.motherMailId = motherMailId;
        user.parentAddress = parentAddress;
        user.date = date;
        user.class10Percentage = class10Percentage;
        user.class12Percentage = class12Percentage;
        user.MENTORING = MENTORING;

        
        await user.save();

        res.render("login", { success: "User details updated successfully." });
    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(401).send("Error while updating user");
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send("Internal Server Error");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
