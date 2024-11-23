import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authApi } from "../lib/api";
import { useAuthStore } from "../store/authStore";

const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username must be less than 20 characters"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true);
			const { confirmPassword, ...registerData } = data;
			const response = await authApi.register(registerData);
			const { user, token } = response.data;
			
			// Set the token in the API instance
			authApi.setAuthToken(token);
			
			// Update auth store
			setAuth(user, token);
			
			toast.success("Registration successful!");
			navigate("/");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					{...register("username")}
					type="text"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<AnimatePresence>
					{errors.username && (
						<motion.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="mt-1 text-sm text-red-600"
						>
							{errors.username.message}
						</motion.p>
					)}
				</AnimatePresence>
			</div>

			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					{...register("email")}
					type="email"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<AnimatePresence>
					{errors.email && (
						<motion.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="mt-1 text-sm text-red-600"
						>
							{errors.email.message}
						</motion.p>
					)}
				</AnimatePresence>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					{...register("password")}
					type="password"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<AnimatePresence>
					{errors.password && (
						<motion.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="mt-1 text-sm text-red-600"
						>
							{errors.password.message}
						</motion.p>
					)}
				</AnimatePresence>
			</div>

			<div>
				<label
					htmlFor="confirmPassword"
					className="block text-sm font-medium text-gray-700"
				>
					Confirm Password
				</label>
				<input
					{...register("confirmPassword")}
					type="password"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<AnimatePresence>
					{errors.confirmPassword && (
						<motion.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="mt-1 text-sm text-red-600"
						>
							{errors.confirmPassword.message}
						</motion.p>
					)}
				</AnimatePresence>
			</div>

			<motion.button
				type="submit"
				disabled={isLoading || isSubmitting}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				whileHover={{ scale: 1.01 }}
				whileTap={{ scale: 0.99 }}
			>
				{isLoading ? (
					<motion.div
						className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					/>
				) : (
					"Create account"
				)}
			</motion.button>
		</motion.form>
	);
}
