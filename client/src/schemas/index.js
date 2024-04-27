import * as yup from "yup"

export const signInSchema = yup.object().shape({
    username: yup.string().required("Email or username is required."),
    password: yup.string().required("Password is required.")
})

export const registerSchema = yup.object().shape({
    username: yup.string().min(3, "Username is too short.").required("Username is required."),
    email: yup.string().email("Please enter a valid email.").required("Email is required."),
    password: yup.string().min(5, "Password is too short.").required("Password is required.")
})

export const commentSchema = yup.object().shape({
    comment: yup.string().max(500, "Comment is too long.").required("Comment is required."),
})

const maxSize = 10 * 1024 * 1024; // 10MB in bytes

export const postSchema = yup.object().shape({
    description: yup.string().max(500, "Description is too long."),
    images: yup.mixed()
        .test('fileType', 'Only JPG, PNG, JPEG, GIF or SVG files are allowed', (value) => {
            if (!Array.isArray(value) && value) {
                const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
                return supportedFormats.includes(value.type); // Ensure the file type is one of the supported image formats
            }
            return true;
        })
        .test('fileSize', 'File size must be less than 10MB', (value) => {
            if (!Array.isArray(value) && value) {
                return value.size <= maxSize; // Ensure the file size is less than or equal to 10MB
            }
            return true;
        }),
    music: yup
        .mixed()
        .test('fileType', 'Only MP3 files are allowed', (value) => {
            if (value) {
                return value.type === 'audio/mpeg'; // Ensure the file type is MP3
            }
            return true;
        })
        .test('fileSize', 'File size must be less than 10MB', (value) => {
            if (value) {
                return value.size <= maxSize; // Ensure the file size is less than or equal to 10MB
            }
            return true;
        }),
});

export const editProfileSchema = yup.object().shape({
    image: yup.mixed()
        .test('fileType', 'Only JPG, PNG, JPEG, GIF or SVG files are allowed', (value) => {
            if (!Array.isArray(value) && value) {
                const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
                return supportedFormats.includes(value.type); // Ensure the file type is one of the supported image formats
            }
            return true;
        })
        .test('fileSize', 'File size must be less than 10MB', (value) => {
            if (!Array.isArray(value) && value) {
                return value.size <= maxSize; // Ensure the file size is less than or equal to 10MB
            }
            return true;
        }),
    username: yup.string().min(3, "Username is too short.").max(15,"Username is too long.").required("Username is required."),
    biography: yup.string().max(150, "Your bio is too long.").required("Username is required."),
    birthday: yup.string().max(10, "Please enter your birth in this form: dd/mm/rrrr"),
    hometown: yup.string().max(30, "Maximum symbols is 30."),
    relations: yup.string().max(30, "Maximum symbols is 30."),
    languages: yup.string().max(150, "Max count of symbols is 30"),
})