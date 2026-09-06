// This file contains different schemas build across whole app

import z from "zod";

const fullName = z.string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(15, 'Username must be less than 15 characters')
    .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers and underscores'
    )
const password = z.string().
        min(6,'Password must be atleast 6 chars long').
        regex(/[A-Za-z]/,{ message : 'Password must contain atleast 1 letter'}).
        regex(/\d/,{message : 'Password must contain atleast 1 number'}).
        regex(/[^A-Za-z0-9]/,{message : 'Password must contain atleast 1 special character'})

//  Schema for Sign Up Form
export const userRegisterSchema = z.object({
    fullName,
    email: z.email('Invalid email format').transform(value => value.toLowerCase().trim()),
    password
})




// Schema for new Project
export const projectSchema = z.object({
    ProjectName : z
    .string()
    .trim()
    .min(3,'Project name is required and must be of atleast 3 character')
    .max(50,'Project name must be 50 characters or less'),

    Description : z
    .string()
    .trim()
    .max(300, 'Description must be 300 characters or less')
    .optional()
})