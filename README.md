# Prulife
Prulife CRUD app
Explanation of the Backend API

In the API project I created a backend project wherein the user can register and be able to see the members of the specific family. In the long run, I’m planning to make a frontend of this and an array where the admin can see each family (because what I made was only for a single family)

So I have a register option to register the family member and also login so that we can separate an admin to non admin especially if the user is still a minor that wants to access the app

I have also created a part where the user can update the details of the user/ family member

The user can also see everyone in the family member. 

I used MongoDB for the database of the family members

Lastly, I created a delete option for the user to delete a certain member or user.

If I’ll be given another chance, I want to make a front end of this. Thank you so much!

Here are the endpoints:

http://localhost:4000/users/register – for registration
http://localhost:4000/users/all - for getting the details of all the members
http://localhost:4000/users/login - for logging in
http://localhost:4000/users/details - to retrieve the details of the user who is logged in
http://localhost:4000/users/:userId – to update, retrieve and delete a specific user
