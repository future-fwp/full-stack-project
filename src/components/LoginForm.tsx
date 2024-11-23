import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../lib/api";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const setAuth = useAuthStore((state) => state.setAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);
			setError("");
			const response = await authApi.login(data);
			const { user, token } = response.data;
			
			// Set the token in the API instance
			authApi.setAuthToken(token);
			
			// Update auth store
			setAuth(user, token);
			
			// Navigate to the previous page or home
			const from = (location.state as any)?.from?.pathname || "/";
			navigate(from);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					{...register("email")}
					type="email"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					{...register("password")}
					type="password"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				{errors.password && (
					<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
			>
				{isLoading ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
}
