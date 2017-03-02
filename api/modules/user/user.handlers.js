import mongoose from 'mongoose';

const User = mongoose.model('user');

export function handleGet(req,res) {

    if (!req.cookies.id) {
        return User
            .find()
            .sort({date: -1})
            .limit(6)
            .exec(function (err, result) {
                if (err) res.end("error");
                else res.end(JSON.stringify(result));
            });
    } 

    return User.findById(req.cookies.id)
        .then(user => {
            const { location } = user; 
            const { coordinates } = location;
            return User.find({
            	_id: { $ne: user._id },
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates
                        },
                        $maxDistance: 1000
                    }
                }
            }).sort({date: -1}).limit(6).exec();
        })
        .then((users) => {
            res.end(JSON.stringify(users));
        });

}

export function handlePost(req,res) {
    
    if (!req.cookies.id) {
        if (!req.body.name) res.end('nameError');
        else if (!req.body.coordinates) res.end('noLoc');
        else {
            const newUser = new User(
                {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    location: {
                        type: "Point",
                        coordinates: JSON.parse(req.body.coordinates)
                    },
                    date: new Date()
                }
            );
            newUser.save(function (err, user) {
                if (err) res.end("dbError");
                else {
                	const date = new Date(Date.now() + 3 * 60 * 60 * 1000);
                	console.log(user._id, user);
                    res.cookie('id', user._id.toString(), { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false });
                    res.cookie('name', user.name, { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false});
                    res.cookie('coordinates', JSON.stringify(user.location.coordinates) , { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false });
                    res.end("Success");
                }
            });
        }
    } else {
        const userId = req.cookies.id;
        User.findByIdAndUpdate(userId,
            {$set:{
                name: req.body.name,                    
                location: {
                    type: "Point",
                    coordinates: JSON.parse(req.body.coordinates)
                },
                date: new Date()
            }})
            .exec(function(err, user){
                if (err) {
                	res.end("updateError");
                }
                else {
                	const date = new Date(Date.now() + 3 * 60 * 60 * 1000);
                	console.log(user._id, user);
                    res.cookie('id', user._id.toString(), { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false });
                    res.cookie('name', user.name, { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false });
                    res.cookie('coordinates', JSON.stringify(user.location.coordinates) , { maxAge: 36000000, domain: 'check-nearby-api.herokuapp.com', httpOnly: false });
                    res.end("updated");
                }
            });
    }

}
