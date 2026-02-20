# MatchBox API

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password API

## connectionRequestRouter
- POST /request/send/status/ :userID
-  POST /request/review/status/ :requestID


## userRouter
- GET /user/requests/received
- GET /user/connection
- GET /feed - gets you the profiles of other user on platform



Staus: ignore , interested ,accepted , rejected