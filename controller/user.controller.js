// const express = require('express')
// const userService = require('../services/userServices')
// const util = require('../util/token');
// const sentMail = require('../middleware/sendMail')



// exports.registration = (req, res) => {
//     req.check('firstName', "FirstName should contain atleast three characters and is should not be empty").isLength({ min: 3 })
//     req.check('lastName', "LastName should contain atleast three characters and is shouldnt be empty ").isLength({ min: 3 })
//     req.check('email', "The email is Invalid").isEmail()
//     req.check('password', "Password should be atleast 6 characters and should have atleast 1 small,capital letters and one number ").isLength({ min: 6 })

//     var errors = req.validationErrors();

//     //var responseResult = {};

//     if (errors) {
//         responseResult.success = false;
//         responseResult.error = errors;
//         res.status(500).send(responseResult)
//     }

//     else {
//         try {
//             //create response result
//             var responseResult = {}
//             /*acessinf the registration and passing the parameters request body from router and providing 
//                 callback function with parameters result and error  */
            
//             userService.registration(req.body, (err, result) => {

//                 if (err) {
//                     responseResult.success = false;
//                     responseResult.error = err;
//                     res.status(500).send(responseResult)
//                 }

//                 else {
//                     responseResult.success = true;
//                     responseResult.result = result;
//                     res.status(200).send(responseResult)
//                 }
//             })
//         }

//         catch (err) {
//             console.log("error in controller", err);
//         }

//     }
// }

// /**
//  * Accessing the login and passing the parameters request body from router and 
//  * providing callback function with parameters result and errors
//  */

// exports.login = (req, res) => {
//     req.check('email', "The Email is invalid").isEmail()
//     req.check('password', "Password should be atleast 6 characters and should have atleast 1 small,capital letters and one number").isLength({ min: 6 })

//     var errors = req.validationErrors();

//     var responseResult = {};

//     if (errors) {
//         responseResult.success = false;
//         responseResult.error = errors;
//         res.status(500).send(responseResult)
//     }
//     else {
//         try {
//             /**
//              * redis should be written
//              */

//             /*  if(result)
//               {
//                   console.log("result"+result);
//                   const resultJSON=JSON.parse(result);
//                   return res.status(200).send(resultJSON);
//               }
//               else
//                {
//              */
//             var responseResult = {}
//             userService.login(req.body, (err, result) => {
//                 if (err) {
//                     responseResult.success = false;
//                     responseResult.error = err;
//                     res.status(500).send(responseResult)
//                 }
//                 else {
//                     const payload = {
//                         user_id: result._id,
//                         email: result.email,
//                         firstName: result.firstName,
//                     }

//                     const obj = util.GenerateTokenForAuthentication(payload);
//                      console.log("controller.obj=>",obj);
//                     responseResult.data=result,
//                     responseResult.token=obj.token
//                     res.status(200).send(responseResult)
//                 }
//             })
//         }
//         // }  


//         catch (err) {
//             console.log("Errors in Controller", err);

//         }
//     }
// }

// exports.getUser = (req, res) => {
//     try {
//         var responseResult = {};
//         userService.getUserEmail(req, (err, result) => {
//             if (err) {
//                 responseResult.success = false,
//                     responseResult.error = err,
//                     res.status(500).send(responseResult)
//             }
//             else {
//                 responseResult.success = true,
//                     responseResult.result = result

//                 const payload = {
//                     user_id: responseResult.result._id
//                 }
//                 //console.log(payload);
//                 const obj = util.GenerateTokenForResetPassword(payload);
//                 //console.log("controller.obj=>",obj);

//                 const url = 'http://loaclhost:3000/resetPassword/${obj.token}';
//               //    const url='http://192.168.0.16:3000/resetPassword';
               
//                 sentMail.sendEmailFunction(req.body.email, url);
//                 res.status(200).send(url)
//             }
//         })
//     }
//     catch (err) {
//         console.log("error in controllers", err);

//     }
// }


// exports.sendResponse = (req, res) => {
//     try {
//         var responseResult = {}
//         console.log("token is verified and giving response");
//         userService.redirect(req.decoded, (err, result) => {
//             if (err) {
//                 responseResult.success = false;
//                 responseResult.error = err;
//                 res.status(500).send(responseResult);
//             }
//             else {
//                 console.log("token is verified and giving response");
//                 responseResult.success = true;
//                 responseResult.result = result;
//                 res.status(200).send(responseResult)
//             }
//         })
//     }
//     catch (err) {
//         console.log("error in controller", err);

//     }
// }


// exports.setPassword = (req, res) => {
//     try {
//         var responseResult = {}
//         userService.resetPassword(req, (err, result) => {
//             if (err) {
//                 responseResult.success = false;
//                 responseResult.err = err;
//                 res.status(500).send(responseResult)
//             }
//             else {
//                 console.log("under user control,the token is verified and giving response");
//                 responseResult.success = true;
//                 responseResult.result = result;
//                 res.status(200).send(responseResult)
//             }
//         })
//     }
//     catch (err) {
//         console.log("error in controller", err);
//     }
// }


// exports.getAllUsers=(req,res)=>{
//     try{
//         var responseResult={}
//         userService.getAllUsers((err,result)=>{
//             if(err){
//                 responseResult.success=false,
//                 responseResult.err=err,
//                 res.status(500).send(responseResult)
//             }
//             else{
//                 responseResult.success=true,
//                 responseResult.result=result,
//                 res.status(200).send(responseResult)
//             }
//         })
//     }
//     catch(err){
//         console.log("error in controller",err)
//     }
// }


const express = require('express')
const userService = require('../services/userServices')
const util = require('../util/token');
const sentMail = require('../middleware/sendMail')



exports.registration = (req, res) => {
    req.check('firstName', "FirstName should contain atleast three characters and is should not be empty").isLength({ min: 3 })
    req.check('lastName', "LastName should contain atleast three characters and is shouldnt be empty ").isLength({ min: 3 })
    req.check('email', "The email is Invalid").isEmail()
    req.check('password', "Password should be atleast 6 characters and should have atleast 1 small,capital letters and one number ").isLength({ min: 6 })

    var errors = req.validationErrors();

    //var responseResult = {};

    if (errors) {
        responseResult.success = false;
        responseResult.error = errors;
        res.status(500).send(responseResult)
    }

    else {
        try {
            //create response result
            var responseResult = {}
            /*acessinf the registration and passing the parameters request body from router and providing 
                callback function with parameters result and error  */
            
            userService.registration(req.body, (err, result) => {

                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                }

                else {
                    responseResult.success = true;
                    responseResult.result = result;
                    res.status(200).send(responseResult)
                }
            })
        }

        catch (err) {
            console.log("error in controller", err);
        }

    }
}

/**
 * Accessing the login and passing the parameters request body from router and 
 * providing callback function with parameters result and errors
 */

exports.login = (req, res) => {
    req.check('email', "The Email is invalid").isEmail()
    req.check('password', "Password should be atleast 6 characters and should have atleast 1 small,capital letters and one number").isLength({ min: 6 })

    var errors = req.validationErrors();

    var responseResult = {};

    if (errors) {
        responseResult.success = false;
        responseResult.error = errors;
        res.status(500).send(responseResult)
    }
    else {
        try {
            /**
             * redis should be written
             */

            /*  if(result)
              {
                  console.log("result"+result);
                  const resultJSON=JSON.parse(result);
                  return res.status(200).send(resultJSON);
              }
              else
               {
             */
            var responseResult = {}
            userService.login(req.body, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                }
                else {
                    const payload = {
                        user_id: result._id,
                        email: result.email,
                        firstName: result.firstName,
                    }

                    const obj = util.GenerateTokenForAuthentication(payload);
                    responseResult.data=result,
                    responseResult.token=obj.token
                    res.status(200).send(responseResult)
                }
            })
        }
        // }  


        catch (err) {
            console.log("Errors in Controller", err);

        }
    }
}

exports.getUser = (req, res) => {
    try {
        var responseResult = {};
        userService.getUserEmail(req, (err, result) => {
            if (err) {
                responseResult.success = false,
                    responseResult.error = err,
                    res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true,
                    responseResult.result = result

                const payload = {
                    user_id: responseResult.result._id
                }
                //console.log(payload);
                const obj = util.GenerateTokenForResetPassword(payload);
                //console.log("controller.obj=>",obj);

                const url = 'http://loaclhost:3000/resetPassword/${obj.token}';
              //    const url='http://192.168.0.16:3000/resetPassword';
                //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", req);

                sentMail.sendEmailFunction(req.body.email, url);
                res.status(200).send(url)
            }
        })
    }
    catch (err) {
        console.log("error in controllers", err);

    }
}


exports.sendResponse = (req, res) => {
    try {
        var responseResult = {}
        console.log("token is verified and giving response");
        userService.redirect(req.decoded, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
                console.log("token is verified and giving response");
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    }
    catch (err) {
        console.log("error in controller", err);

    }
}


exports.setPassword = (req, res) => {
    try {
        var responseResult = {}
        userService.resetPassword(req, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.err = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log("under user control,the token is verified and giving response");
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult)
            }
        })
    }
    catch (err) {
        console.log("error in controller", err);
    }
}


exports.getAllUsers=(req,res)=>{
    try{
        var responseResult={}
        userService.getAllUsers((err,result)=>{
            if(err){
                responseResult.success=false,
                responseResult.err=err,
                res.status(500).send(responseResult)
            }
            else{
                responseResult.success=true,
                responseResult.result=result,
                res.status(200).send(responseResult)
            }
        })
    }
    catch(err){
        console.log("error in controller",err)
    }
}