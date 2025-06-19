import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Registering with data:", data); // 🐞 log form data
        try {
            const response = await api.post("/register", data);
            console.log("Response:", response.data); // 🐞 log API response

            toast.success("Registered successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Email" {...register("username")} />
            <p>{errors.email?.message}</p>
            <input type="password" placeholder="Password" {...register("password")} />
            <p>{errors.password?.message}</p>
            <button type="submit">Register</button>
        </form>
    );
}
