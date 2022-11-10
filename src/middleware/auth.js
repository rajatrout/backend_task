const jwt = require("jsonwebtoken")

exports.authentication = async function(req, res, next) {
    try {
        let token = req.headers.authorization
        if (typeof token == 'undefined' || typeof token == 'null') {
            return res.status(400).send({ status: false, msg: "Token must be present, not available." })
        }

        let bearerToken = token.split(' ') //[Bearer, Token]
        let Token = bearerToken[1]

        jwt.verify(Token, "rajat", function(error, data) {
            if (error) {
                return res.status(401).send({ status: false, message: error.message });
            } else {
                req.decodedToken = data
                next()
            }
        })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.authorization = async function(req, res, next) {

    const tokenUserId = req.decodedToken.teacherId
    const  teacherId = req.params.userId

    if (teacherId) {

        if (!valid.isValidObjectId(teacherId)) {
            return res.status(400).send({ status: false, message: "Invalid teacherId." })
        }

        const checkTeacherId = await userModel.findOne({ _id: teacherId })
        if (!checkTeacherId) {
            return res.status(404).send({ status: false, message: "Teacher Not Found" })
        }

        if (teacherId !== tokenUserId) {
            return res.status(403).send({ status: false, message: "You are not Authorize." })
        }
        next()
    }
}