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
- POST /request/send/intrested/ :userID
- POST /request/send/ignored/ :userID

- POST /request/review/accepted/ :requestID
- POST /request/review/rejected/ :requestID

## userRouter
- GET /connections
- GET /request/recevied
- GET /feed - gets you the profiles of other user on platform



Staus: ignore , interested ,accepted , rejected